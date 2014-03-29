module.exports = function(grunt) {

    grunt.initConfig({

        // running `grunt less` will compile once
        less: {
            development: {
                options: {
                    paths: ["./less"],
                    yuicompress: true,
                    sourceMap: true,
                    sourceMapFilename: "./css/site.css.map",
                    sourceMapRootpath: "/"
                },
                files: {
                    "./css/site.css": "./less/site.less"
                }
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: "./vendor"
                }
            }
        },

        coffee: {
            compile: {
                options: {
                    sourceMap: false,
                    runtime: "window"
                },

                expand: true,
                flatten: true,
                cwd: './coffee/',
                src: ['*.coffee'],
                dest: './js/',
                ext: '.js'

            },
        },

        uglify: {
            build: {
                options: {
                    mangle: true,
                },
                files: [{
                    expand: true,
                    cwd: '/_site/js/',
                    src: '**/*.js',
                    dest: '/_site/js/',
                    ext: ".js"
                }]
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: "JST",
                    processName: function(filePath) {
                        var name = filePath.substr(filePath.lastIndexOf("/") + 1);
                        return name.replace('.hbs', '');
                    },
                },
                files: {
                    "./js/templates.js": "./templates/*.hbs"
                }
            }
        },


        rsync: {
            options: {
                args: ["--verbose"],
                recursive: true
            },
            prod: {
                options: {
                    src: 'public/',
                    dest: "/home/jaybill/sites/bigreadout/prod",
                    host: "jaybill@haveaco.in",
                    syncDestIgnoreExcl: true
                }
            }
        },

        // running `grunt watch` will watch for changes
        watch: {
            coffeescript: {
                files: "./coffee/*.coffee",
                tasks: "newer:coffee"
            },
            less: {
                files: "./less/*.less",
                tasks: "newer:less"
            },
            handlebars: {
                files: "./templates/*.hbs",
                tasks: "newer:handlebars"
            }
        }
    });

    grunt.registerTask(
        'build',
        'Builds application in preparation for deployment.', [
            'bower',
            'coffee',
            'less',
            'handlebars',
            'uglify',
        ]
    );

    grunt.registerTask(
        'deploy',
        'Deploys build to live server', ['build', 'rsync:prod']
    );

    grunt.registerTask(
        'buildnwatch',
        'builds, then watches.', ['coffee', 'less', 'handlebars', 'watch']
    );

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-iced-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-rsync");
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-ssh');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-newer');


};
