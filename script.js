const avatar = document.querySelector('#profile-photo');
const avatarLink = document.querySelector('#profile-photo-link');
const realName = document.querySelector('#realname');
const userName = document.querySelector('#username');
const counter = document.querySelector('#counter');
const role = document.querySelector('#role');
const smallRole = document.querySelector('#small-role');
const repoList = document.querySelector('#repo-list');
const smallImage = document.querySelector('#small-image1');
const smallRealName = document.querySelector('#small-realname');
const smallLogin = document.querySelector('#small-login');
const loginInput = document.querySelector('.form-control');
const loginBtn = document.querySelector('#btn');
const loginSection = document.querySelector('#login');
const bodyy = document.querySelector('body');
const profileBody = document.querySelector('#body');
const flashMessage = document.querySelector('.flash-message');
const flashMessageText = document.querySelector('.flash-message .message p');
const closeFlashMessage = document.querySelector('.flash-message .close');




loginBtn.onclick = async (e) => {
	e.preventDefault();
	if (loginInput.value === '') {
		flashMessage.style.display = 'flex';
		flashMessageText.textContent = 'Username input is empty';
		return;
	}
	const error = await loadDetails(loginInput.value);
	if (error) {
		flashMessageText.textContent = 'Username does not exist';
		flashMessage.style.display = 'flex';
		return;
	}
	loginSection.style.display = 'none';
	bodyy.style.overflow = 'auto';
};



function loadDetails(userLogin) {
	const result = fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			Authorization: 'bearer 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'
		},
		body: JSON.stringify({
			query: `
                query MyQuery {
  user(login: "${userLogin}" ) {
    avatarUrl
    bio
    name
    repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
      edges {
        node {
          forkCount
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              node {
                name
                color
              }
            }
          }
          name
          updatedAt
          description
          stargazerCount
        }
      }
      totalCount
    }
    login
  }
}
            `
		})
	}).then(res => res.json()).then(data => {

		profileBody.style.display = 'block';

		// console.log(data.data);
		const result = data.data.user;

		const { avatarUrl, name, login, bio, repositories: { totalCount } } = result;

		avatar.src = avatarUrl;
		smallImage.src = avatarUrl;
		avatarLink.href = avatarUrl;
		realName.textContent = name;
		smallRealName.textContent = name;
		userName.textContent = login;
		smallLogin.textContent = login;
		counter.textContent = totalCount;
		role.textContent = bio;
		smallRole.textContent = bio;
		repos(result);

	}).catch(err => {
		return err;
	});

	return result;
}

function repos(result) {
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	result.repositories.edges.forEach(repo => {

		repoList.innerHTML += `<li class="single-repo">
							<div>
								<h3>${repo.node.name}</h3>
								<p class='p'>
									${repo.node.description || ''}
								</p>
								<div class="repo-details">
                                    ${repo.node.languages.edges.length != '0' ? `
                                    
									<div class="repo-language-color" style='background-color: ${repo.node.languages.edges.length != '0' ? repo.node.languages.edges[0].node.color : ''}'></div>
									<p>${repo.node.languages.edges.length != '0' ? repo.node.languages.edges[0].node.name : ''}</p>
                                    ` : ''}
                                    ${repo.node.stargazerCount != '0' ? `
									<div class='flex' ><svg
										aria-label="star"
										class="octicon octicon-star"
										viewBox="0 0 16 16"
										version="1.1"
										width="16"
										height="16"
										role="img"
									>
										<path
											fill-rule="evenodd"
											d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
										></path>
									</svg>
									<p class='para'>${repo.node.stargazerCount}</p></div>
                                    ` : ''}
                                    ${repo.node.forkCount != '0' ? `
									<div class='flex' ><svg
										aria-label="fork"
										class="octicon octicon-repo-forked"
										viewBox="0 0 16 16"
										version="1.1"
										width="16"
										height="16"
										role="img"
									>
										<path
											fill-rule="evenodd"
											d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
										></path>
									</svg>
									<p class='para'>${repo.node.forkCount}</p></div>
                                    
                                    ` : ''}
									<p>Updated on ${months[new Date(repo.node.updatedAt).getMonth()]} ${new Date(repo.node.updatedAt).getDate()}${new Date(repo.node.updatedAt).getFullYear() === new Date().getFullYear() ? '' : `, ${new Date(repo.node.updatedAt).getFullYear()}`}</p>
								</div>
							</div>
							<div class="star">
								<div>
									<svg
										aria-label="star"
										class="octicon octicon-star"
										viewBox="0 0 16 16"
										version="1.1"
										width="16"
										height="16"
										role="img"
									>
										<path
											fill-rule="evenodd"
											d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
										></path>
									</svg>
									<p>Star</p>
								</div>
							</div>
						</li>`;
	});
}

closeFlashMessage.onclick = () => {
	flashMessage.style.display = 'none';
};