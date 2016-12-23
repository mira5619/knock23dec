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

          /*      var name = repository.name;
          console.log('myname: '+ name);
                var full_name = repository.full_name;
                var user = repository.owner.login;
                var user_repo = repository.owner.html_url;
                var decription = repository.description;
                var languages = repository.languages_url;
                var link_to_repository = repository.html_url;
*/

         //build html
                /*var build_html = '<li class="repo"><p><b>name: </b><a class="repo_info" href="#">'
                 + name +'</p></a><p><strong>user: </strong><a class="user_info" href="#"<p>' + user +'</p></a></li>';
                ghdata.append(build_html);*/

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

        var ViewModel =  function (data){
          var self = this;
          this.name = ko.observable(data.name);
          this.full_name = ko.observable(data.full_name);
          this.user = ko.observable(data.owner.login);
          this.user_repo = ko.observable(data.owner.html_url);
          this.description = ko.observable(data.description);
          this.languages = ko.observable(data.languages_url);

          this.link_to_repository = ko.observable(data.html_url);

          //this.details = ko.observable("Link to repository:")

          this.repoList = ko.observableArray([]);

          repositories.forEach(function(repository) {
            self.repoList.push(new Repo(repository));
          });

          // set first repo
          this.currentRepo = ko.observable(this.repoList()[0]);
          //this.currentRepo = ko.observable(repositories[0]);
  console.log(this.currentRepo);

        };

        ko.applyBindings(new ViewModel(repository));

          }).error(function(e){
        ghdata.text('Github Repositories Could Not Be Loaded');
    });

      }; //close loadData
      $("#btn").on('click', loadData);

    }); //close document ready