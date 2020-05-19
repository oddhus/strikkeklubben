require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "production"}`,
})

const path = require('path')
const admin = require('firebase-admin')
const serviceAccount = require("./firebase.js")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mine-strikkeoppskrifter.firebaseio.com"
});

exports.onCreateNode = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions

  const data = await admin.firestore()
      .collection('projects')
      .where('isPublic','==',true)
      .orderBy('createdAt', 'desc')
      .get()
  
  const photos = data.docs.map(doc => {
    return {
      uid: doc.id,
      ...doc.data()
    }
  })

  for (const photo of photos) {
    try {
      const node = {
        ...photo, // We copy all of the properties from the game object
        id: createNodeId(`project-photo-${photo.uid}`), // Needs to be unique
        internal: {
          type: 'projects',
          contentDigest: createContentDigest(photo) // We pass in the game object to make sure it's unique
        }
      }

      await createNode(node)

    } catch (error) {
      console.warn('error creating node', error);
    }
  }
}


exports.createPages = async ({graphql, actions}) => {
    const { createPage } = actions
    const projectTemplate = path.resolve('./src/templates/projectTemplate.js')

    const result = await graphql(`
    {
      allProjects {
        edges {
          node {
            uid
          }
        }
      }
    }
    `)

  result.data.allProjects.edges.forEach(project => {
    createPage({
      path: `/project/${project.node.uid}`,
      component: projectTemplate,
      context: {projectId: project.node.uid}

    // return await app
    //     .firestore()
    //     .collection('projects')
    //     .get()
    //     .then((result) => {
    //         result.forEach(project => {
    //             createPage({
    //                 path: `/project/${project.id}`,
    //                 component: projectTemplate,
    //                 context: project.data()
    //             })
    //         })
    //     })
})
})
}



