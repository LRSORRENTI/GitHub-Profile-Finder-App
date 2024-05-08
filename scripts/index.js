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
            // Optionally display the user's profile data here
            $('#profile').html(`
              <div class="p-4 border rounded shadow-sm">
                <img src="${user.avatar_url}" alt="User Avatar" class="w-32 h-32 mb-2 rounded-full">
                <h2 class="text-2xl font-semibold">${user.login}</h2>
                <p class="text-slate-500">${user.bio || ''}</p>
                <a href="${user.html_url}" class="text-blue-500" target="_blank">View Profile</a>
              </div>
            `);
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