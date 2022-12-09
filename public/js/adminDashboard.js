
function AcceptVendor (status, id) {

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            status: status,
            Id: id,
        }),
      };
      fetch("/adminDashboard", options)
        .then(function (response) {
  
          window.location.reload();
  
        })
        .catch(function (error) {
          console.log(error);
        });

    return;
  
  }

  function DeclineVendor (status, id) {

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            status: status,
            Id: id,
        }),
      };
      fetch("/adminDashboard", options)
        .then(function (response) {
  
          window.location.reload();
  
        })
        .catch(function (error) {
          console.log(error);
        });

    return;
  
  }