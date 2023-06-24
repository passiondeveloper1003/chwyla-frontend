const query = `
{
  allWpPage {
    nodes {
      id
      uri
      acf {
        header
      }
    }
  }
  allWpPost {
    nodes {
      id
      uri
    }
  }
  allWpTeam {
    nodes {
      id
      uri
    }
  }
  allWpProperty {
    nodes {
      id
      slug
      title
      link
      databaseId
      propertyAddress {
        hideAddress
        suburb
      }
      propertyListing {
        marketingStatus
      }
    }
  }
  allWpRental {
    nodes {
      id
      slug
      title
      link
      databaseId
      propertyAddress {
        hideAddress
        suburb
      }
      propertyListing {
        marketingStatus
      }
    }
  }
}
`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const res = await graphql(query)

  res.data.allWpPage.nodes.map((node) => {
    createPage({
      path: node.uri,
      component: require.resolve("./src/templates/page.js"),
      context: {
        id: node.id,
        header: node.acf.header,
      },
    })
  })

  res.data.allWpPost.nodes.map((node) => {
    createPage({
      path: node.uri,
      component: require.resolve("./src/templates/post.js"),
      context: {
        id: node.id,
        header: 'black',
      },
    })
  })

  res.data.allWpTeam.nodes.map((node) => {
    createPage({
      path: node.uri,
      component: require.resolve("./src/templates/profile.js"),
      context: {
        id: node.id,
        header: 'black',
      },
    })
  })

  res.data.allWpProperty.nodes.map((node) => {
    let pathName = `/property/${node.slug}/`
    if (node.propertyAddress?.hideAddress) {
      pathName = `/property/${node.propertyAddress.suburb.toLowerCase().replace(/ /gi, '-')}-${node.databaseId}/`
    }

    if (node.propertyAddress === null) return false

    createPage({
      path: pathName,
      component: require.resolve("./src/templates/property.js"),
      context: {
        id: node.id,
        header: 'black',
        status: node.propertyListing.marketingStatus ? node.propertyListing.marketingStatus : '',
      },
    })
  })

  res.data.allWpRental.nodes.map((node) => {
    let pathName = `/rental/${node.slug}/`
    if (node.propertyAddress?.hideAddress) {
      pathName = `/rental/${node.propertyAddress.suburb.toLowerCase().replace(/ /gi, '-')}-${node.databaseId}/`
    }

    if (node.propertyAddress === null) return false

    createPage({
      path: pathName,
      component: require.resolve("./src/templates/rental.js"),
      context: {
        id: node.id,
        header: 'black',
        status: node.propertyListing.marketingStatus ? node.propertyListing.marketingStatus : '',
      },
    })
  })

}