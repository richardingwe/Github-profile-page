// fetch('https://countries.trevorblades.com/', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//         query: `
//                 query {
//                     continents {
//                         name
//                     }
//                 }
//             `
//     })
// }).then(res => res.json()).then(data => {
//     console.log(data.data);
// })


fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Authorization: 'bearer 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'
    },
    body: JSON.stringify({
        query: `
                query MyQuery {
                    user(login: "richardingwe") {
                        id
                        avatarUrl
                        bio
                        bioHTML
                        company
                        companyHTML
                        name
                        repositories(first: 5, orderBy: {field: UPDATED_AT, direction: DESC}) {
                        edges {
                            node {
                            forkCount
                            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
                                edges {
                                node {
                                    name
                                    color
                                }
                                }
                            }
                            codeOfConduct {
                                name
                            }
                            name
                            updatedAt
                            descriptionHTML
                            }
                        }
                        totalCount
                        }
                    }
                }


            `
    })
}).then(res => res.json()).then(data => {
    console.log(data.data);
});