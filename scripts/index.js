// $(document).ready(() => {
//     $('#searchBtn').on("submit", [evtData], () => {
//         console.log(evtData)
//     })
//     $('#searchUser').on('keyup', (evt) => {
//         console.log(evt.target.value)
//         let username = evt.target.value;
        
        // make request to GitHub API
        // $.ajax({
        //     url: `https://api.github.com/users/${username}`
        // }).done((user) => {
        //     console.log(user)
        // });
//     })
// })

$(document).ready(() => {
  $('#searchBtn').on('click', () => {
    // Get the value of the search input
    let username = $('#searchUser').val().trim();

    // If input isn't empty, make a request to GitHub API
    if (username !== '') {
      $.ajax({
        url: `https://api.github.com/users/${username}`,
        success: (user) => {
          console.log(user); // Log user data

          // Convert the date to a readable format
          let createdAt = new Date(user.created_at).toLocaleDateString();

          // Ensure properties exist before displaying them
          let company = user.company || 'N/A';
          let website = user.blog || 'N/A';
          let location = user.location || 'N/A';
          let bio = user.bio || '';

          // Populate profile information
          $('#profile').html(`
            <div class="border rounded shadow-sm">
              <img src="${user.avatar_url}" alt="User Avatar" class="w-32 h-32 mb-2 rounded-full avatar mt-2">
              <h2 class="text-2xl font-semibold text-slate-700">${user.login} - ${user.name}</h2>
              <p class="text-indigo-700">${bio}</p>
              <a href="${user.html_url}" class="text-2xl font-semibold text-indigo-700 hover:text-indigo-500 transition ease" target="_blank">View Profile</a>
            </div>
            <div class="flex justify-between space-x-2 my-2">
              <span>Repos: ${user.public_repos}</span>
              <span>Gists: ${user.public_gists}</span>
              <span>Followers: ${user.followers}</span>
              <span>Following: ${user.following}</span>
            </div>
            <ul class="list-group mb-4">
              <li class="list-group-item">Company: ${company}</li>
              <li class="list-group-item">Website: ${website}</li>
              <li class="list-group-item">Location: ${location}</li>
              <li class="list-group-item">Member Since: ${createdAt}</li>
            </ul>
            <h3 class="text-xl font-semibold mb-2">Latest Repos</h3>
            <div id="repos" class=""></div>
          `);

          // Additional AJAX request to get the user's repositories
          $.ajax({
            url: `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, // Adjust `per_page` as desired
            success: (repos) => {
              // Loop through repositories to create the HTML with languages
              let reposHTML = repos.map((repo) => {
                // Variable to store languages and icons
                let languagesHTML = '';
                let languageIconsHTML = '';

                // Fetch languages from the `languages_url`
                $.ajax({
                  url: repo.languages_url,
                  async: false, // Ensures that the request for languages executes synchronously
                  success: (languages) => {
                    const languageNames = Object.keys(languages);
                    languagesHTML = languageNames.join(', ') || 'No languages';

                    // Generate icons based on language mappings
                    const iconMap = {
                      'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
                      'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
                      'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
                      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
                      'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
                      'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'
                    };

                    // Create icon elements based on languages
                    languageIconsHTML = languageNames.map((lang) => {
                      return iconMap[lang] ? `<img class="icon" src="${iconMap[lang]}" alt="${lang} Icon" />` : '';
                    }).join('');
                  }
                });

                // Return the HTML block for the current repo
                return `
                  <div id="singleRepo">
                  <div id="repoTitle">
                    <a href="${repo.html_url}" target="_blank" class="" id="repo-name">${repo.name}</a>
                    <p class="max-w-96">${repo.description || 'No description provided'}</p>
                  </div>
                  <div id="repoStats" class="mb-4">
                    <span>Forks: ${repo.forks_count || '0'} </span>
                    <span>Watchers: ${repo.watchers_count || '0'}</span>
                    <span>Stars: ${repo.stargazers_count || '0'}</span>
    
                    <div id="languages" class="flex">${languageIconsHTML}</div>
                  </div>
                  </div>
                `;
              }).join('');
{/* <span>Languages: ${languagesHTML}</span> */}
              $('#repos').html(reposHTML || '<p>No public repositories found.</p>');
            },
            error: (err) => {
              console.log(err);
              $('#repos').html('<p class="text-red-500">Unable to fetch repositories.</p>');
            }
          });
        },
        error: (err) => {
          console.log(err);
          $('#profile').html('<p class="text-red-500">User not found or an error occurred.</p>');
        }
      });
    }
  });

  // Optionally log keystrokes in the input field
  $('#searchUser').on('keyup', (evt) => {
    console.log(evt.target.value);
  });
});


{/* <div class="border rounded shadow-sm">
  <img src="${user.avatar_url}" alt="User Avatar" class="w-32 h-32 mb-2 rounded-full avatar mt-2">
  <h2 class="text-2xl font-semibold">${user.login} - ${user.name}</h2>
  <p class="text-indigo-700">${bio}</p>
  <a href="${user.html_url}" class="text-2xl text-indigo-700 hover:text-indigo-500 transition ease" target="_blank">View Profile</a>
</div>
<div class="flex justify-between space-x-2 my-2">
  <span>Repos: ${user.public_repos}</span>
  <span>Gists: ${user.public_gists}</span>
  <span>Followers: ${user.followers}</span>
  <span>Following: ${user.following}</span>
</div>
<ul class="list-group mb-4">
  <li class="list-group-item">Company: ${company}</li>
  <li class="list-group-item">Website: ${website}</li>
  <li class="list-group-item">Location: ${location}</li>
  <li class="list-group-item">Member Since: ${createdAt}</li>
</ul>
<h3 class="text-xl font-medium mb-2">Latest Repos</h3>
<div id="repos"></div>
<div class="mb-2">
  <a href="${repo.html_url}" target="_blank" class="text-indigo-700 font-semibold">${repo.name}</a>
  <p>${repo.description || 'No description provided'}</p>
</div>
<div>
  <span>Forks: ${repo.forks_count || '0'}</span>
  <span>Watchers: ${repo.watchers_count || '0'}</span>
  <span>Stars: ${repo.stargazers_count || '0'}</span>
  <span>Languages: ${languagesHTML}</span>
</div> */}

