const path = require('path')
const firebase = require('firebase');
const config = require('./firebase')
const app = firebase.initializeApp(config);

exports.onCreateNode = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions

  const data = await app
      .firestore()
      .collection('projects')
      .where('isPublic','==',true)
      .get()
  
  const test = data.docs.map(doc => {
    console.log(doc.id)
    return {
      uid: doc.id,
      ...doc.data()
    }
  })

  for (const photo of test) {
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



