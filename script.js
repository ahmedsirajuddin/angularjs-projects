angular.module("openSourceApp", [])
    .directive('scrollToItem', function() {                                                      
        return {                                                                                 
            restrict: 'A',                                                                       
            scope: {                                                                             
                scrollTo: "@"                                                                    
            },                                                                                   
            link: function(scope, $elm,attr) {                                                   
                $elm.on('click', function(e) {                                                    
                    e.preventDefault();
                   $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top-50}, "slow"); // -50 because the fixed navbar is 50px high
                });                                                                              
            }                                                                                    
        }})
        .controller("NavTabController", ['TabService', function(TabService) {
                var self = this;
                self.getdropDown = function() {
                    return TabService.getdropDown();
                }

                self.getTab = function() {
                    return TabService.getTab();
                }

                self.switchTab = function(currentTab, dropDown) {
                    if (!(typeof dropDown === "undefined")) {
                        TabService.switchdropDown(dropDown);
                    };

                    TabService.switchTab(currentTab);
                }
                /*self.tab = "home";
                self.switchTab = function(currentTab) {
                    self.tab = currentTab;
                    alert(self.tab);
                    };*/
        }])

        .factory("TabService", [function() {
            var tab = "home";
            var dropDown = "none";
            return {
                getdropDown: function() {
                    return dropDown;
                },
                getTab: function() {
                    return tab;
                },
                switchTab: function(currentTab) {
                    tab = currentTab;
                },
                switchdropDown: function(currentdropDown) {
                    dropDown = currentdropDown;
                }
            }
        }])
        .controller("BlogsController", ['BlogsService', function(BlogsService) {
            var self = this;
            self.getBlogs = function() {
              return BlogsService.getBlogs();
           } 
            self.add = function(blog) {
                BlogsService.add(blog);
            };


        }])

        .factory("BlogsService", ['TabService', function(TabService) {
            var blogs = [
                 {
                    title: "Sample Post",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    user: "Admin",
                    },
                 {
                    title: "Second Post",
                    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
                    user: "Admin",
                },
                {
                    title: "First Post",
                    content: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
                    user: "Admin",
                }
            ]

            return {
                getBlogs: function() {
                    return blogs;
                },
                add: function(blog) {
                    blog.new = true;
                    blogs.unshift(blog);
                    TabService.switchdropDown('none');
                }
            };
        }])

        .controller("PostController", ['PostService', function(PostService) {
            var self = this;
            self.getPosts = function() {
                return PostService.getPosts();
            },

            self.add = function(post) {
                var self = this;
                PostService.add(post);
                self.post = null; // clear the form
            }
        }])
        
        .factory("PostService", [function() {
            var today = new Date();
            var posts = [
                {
                    username: "Admin",
                    post: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                    created: "August 8 2015",
                    replies: [{username: "Anonymous", post:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", created: today}],
                }
            ]

            return {
                getPosts: function() {
                   return posts;
                },

                add: function(post) {
                    post.created = new Date();
                    post.new = true;
                    posts.unshift(post);
                },
            };
        }])

