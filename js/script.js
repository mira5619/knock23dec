$(document).ready(function() {

        var repositories = [];
        function loadData() {
        // var ghdata = $('#ghdata');
        // clear out old data before new request*/
        // ghdata.text("");

        var ghUrl = 'https://api.github.com/repositories?since=1; rel="first"';
        // var sghUrl = 'https://api.github.com/users/' + repo_search;

        $.getJSON(ghUrl, function (json) {

          for (var i = 0; i < json.length; i++) {
                var repository = json[i];
                repositories.push(repository);
           }; //end of the loop

    console.log(repositories);


        var Repo = function(data){
          this.name = data.name;
          this.full_name = data.full_name;
          this.user = data.owner.login;
          this.user_repo = data.owner.html_url;
          this.description = data.description;
          this.languages = data.languages_url;
          this.link_to_repository = data.html_url;
        };

 //********view model*******

        var ViewModel =  function (){
          var self = this;

          this.repoList = ko.observableArray([]);

          repositories.forEach(function(repository) {
            self.repoList.push(new Repo(repository));
          });

          // set first repo
          this.currentRepo = ko.observable(this.repoList()[0]);
          this.setRepo = function(clickedRepo) {
            self.currentRepo(clickedRepo);
          };

        };

        ko.applyBindings(new ViewModel());

          }).error(function(e){
        ghdata.text('Github Repositories Could Not Be Loaded');
    });

      }; //close loadData
      $("#btn").on('click', loadData);

    }); //close document ready