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
              <div class="p-4 border rounded shadow-sm">
                <img src="${user.avatar_url}" alt="User Avatar" class="w-32 h-32 mb-2 rounded-full">
                <h2 class="text-2xl font-semibold">${user.login} - ${user.name}</h2>
                <p class="text-slate-500">${bio}</p>
                <a href="${user.html_url}" class="text-blue-500" target="_blank">View Profile</a>
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
            `);
  
            // Additional AJAX request to get the user's repositories
            $.ajax({
              url: `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, // Adjust `per_page` as desired
              success: (repos) => {
                // map through the repos for each repository
                let reposHTML = repos.map((repo) => `
                  <div class="mb-2">
                    <a href="${repo.html_url}" target="_blank" class="text-blue-500 font-semibold">${repo.name}</a>
                    <p>${repo.description || 'No description provided'}</p>
                  </div>
                `).join('');
  
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
  