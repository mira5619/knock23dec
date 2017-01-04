$(document).ready(function() {


  var repositories = [];
  function loadData() {

    var ghUrl = 'https://api.github.com/repositories?since=1; rel="first"';
    // var sghUrl = 'https://api.github.com/users/' + repo_search;

    $.getJSON(ghUrl, function (json) {
      for (var i = 0; i < json.length; i++) {
        var repository = json[i];
        repositories.push(repository);
      } //end of the loop

      //console.log(repositories);
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

        this.searchStr = ko.observable("");
        //filter
        this.search = ko.computed(function() {
          return ko.utils.arrayFilter(self.repoList(), function(repo) {
            if (repo.name.toLowerCase().indexOf(self.searchStr().toLowerCase())>=0) {
              return true;
            }
          });
        });

        //sort
        ko.observableArray.fn.sortByProperty = function(prop) {
                this.sort(function(obj1, obj2) {
                  if (obj1[prop] == obj2[prop])
                   return 0;
                  else if (obj1[prop] < obj2[prop])
                     return -1 ;
                      else
                   return 1;
                    });
                  };
        self.repoList.sortByProperty("name");
        //this.repoList.sortByProperty('user');

      };
      ko.applyBindings(new ViewModel());
      }).error(function(e){
        ghdata.text("Github Repositories Could Not Be Loaded");
    });

  } //close loadData
  $("#btn").on("click", function(){
    $(".repositories").removeClass("hidden");

    //$( "section:hidden" ).show( "fast" );
    loadData();
    $(".search").removeClass("hidden");
  });

}); //close document ready
