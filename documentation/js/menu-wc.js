'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-bbb7f0c197e9d2d6dab6863a29b58840efd3ef4bf5cb76c93d2a9c3dc3e64e65173164411ffd524e31d8db9cb227bdfb15a173764459744ccbee23fc991a8bf4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-bbb7f0c197e9d2d6dab6863a29b58840efd3ef4bf5cb76c93d2a9c3dc3e64e65173164411ffd524e31d8db9cb227bdfb15a173764459744ccbee23fc991a8bf4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-bbb7f0c197e9d2d6dab6863a29b58840efd3ef4bf5cb76c93d2a9c3dc3e64e65173164411ffd524e31d8db9cb227bdfb15a173764459744ccbee23fc991a8bf4"' :
                                            'id="xs-controllers-links-module-AppModule-bbb7f0c197e9d2d6dab6863a29b58840efd3ef4bf5cb76c93d2a9c3dc3e64e65173164411ffd524e31d8db9cb227bdfb15a173764459744ccbee23fc991a8bf4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-bbb7f0c197e9d2d6dab6863a29b58840efd3ef4bf5cb76c93d2a9c3dc3e64e65173164411ffd524e31d8db9cb227bdfb15a173764459744ccbee23fc991a8bf4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-bbb7f0c197e9d2d6dab6863a29b58840efd3ef4bf5cb76c93d2a9c3dc3e64e65173164411ffd524e31d8db9cb227bdfb15a173764459744ccbee23fc991a8bf4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bbb7f0c197e9d2d6dab6863a29b58840efd3ef4bf5cb76c93d2a9c3dc3e64e65173164411ffd524e31d8db9cb227bdfb15a173764459744ccbee23fc991a8bf4"' :
                                        'id="xs-injectables-links-module-AppModule-bbb7f0c197e9d2d6dab6863a29b58840efd3ef4bf5cb76c93d2a9c3dc3e64e65173164411ffd524e31d8db9cb227bdfb15a173764459744ccbee23fc991a8bf4"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-9110e9a16f54b24904a9158b212a8cb8f46c78330d7c170c6b0dcd7380791a36b22c158c9f3eb351b04ac3459d78a8bf8d36bc6ba1227b80e8b1b97cdd33c0b2"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-9110e9a16f54b24904a9158b212a8cb8f46c78330d7c170c6b0dcd7380791a36b22c158c9f3eb351b04ac3459d78a8bf8d36bc6ba1227b80e8b1b97cdd33c0b2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-9110e9a16f54b24904a9158b212a8cb8f46c78330d7c170c6b0dcd7380791a36b22c158c9f3eb351b04ac3459d78a8bf8d36bc6ba1227b80e8b1b97cdd33c0b2"' :
                                            'id="xs-controllers-links-module-AuthModule-9110e9a16f54b24904a9158b212a8cb8f46c78330d7c170c6b0dcd7380791a36b22c158c9f3eb351b04ac3459d78a8bf8d36bc6ba1227b80e8b1b97cdd33c0b2"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-9110e9a16f54b24904a9158b212a8cb8f46c78330d7c170c6b0dcd7380791a36b22c158c9f3eb351b04ac3459d78a8bf8d36bc6ba1227b80e8b1b97cdd33c0b2"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-9110e9a16f54b24904a9158b212a8cb8f46c78330d7c170c6b0dcd7380791a36b22c158c9f3eb351b04ac3459d78a8bf8d36bc6ba1227b80e8b1b97cdd33c0b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-9110e9a16f54b24904a9158b212a8cb8f46c78330d7c170c6b0dcd7380791a36b22c158c9f3eb351b04ac3459d78a8bf8d36bc6ba1227b80e8b1b97cdd33c0b2"' :
                                        'id="xs-injectables-links-module-AuthModule-9110e9a16f54b24904a9158b212a8cb8f46c78330d7c170c6b0dcd7380791a36b22c158c9f3eb351b04ac3459d78a8bf8d36bc6ba1227b80e8b1b97cdd33c0b2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-c41348103592c5e1d35fd72fd8578a7642e3c57f523776191416253b49068698e940c7c3e295dc9cdd908f9bd0d9d24647a78a375244fb652df1b45b597cb837"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-c41348103592c5e1d35fd72fd8578a7642e3c57f523776191416253b49068698e940c7c3e295dc9cdd908f9bd0d9d24647a78a375244fb652df1b45b597cb837"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-c41348103592c5e1d35fd72fd8578a7642e3c57f523776191416253b49068698e940c7c3e295dc9cdd908f9bd0d9d24647a78a375244fb652df1b45b597cb837"' :
                                            'id="xs-controllers-links-module-PostsModule-c41348103592c5e1d35fd72fd8578a7642e3c57f523776191416253b49068698e940c7c3e295dc9cdd908f9bd0d9d24647a78a375244fb652df1b45b597cb837"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-c41348103592c5e1d35fd72fd8578a7642e3c57f523776191416253b49068698e940c7c3e295dc9cdd908f9bd0d9d24647a78a375244fb652df1b45b597cb837"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-c41348103592c5e1d35fd72fd8578a7642e3c57f523776191416253b49068698e940c7c3e295dc9cdd908f9bd0d9d24647a78a375244fb652df1b45b597cb837"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-c41348103592c5e1d35fd72fd8578a7642e3c57f523776191416253b49068698e940c7c3e295dc9cdd908f9bd0d9d24647a78a375244fb652df1b45b597cb837"' :
                                        'id="xs-injectables-links-module-PostsModule-c41348103592c5e1d35fd72fd8578a7642e3c57f523776191416253b49068698e940c7c3e295dc9cdd908f9bd0d9d24647a78a375244fb652df1b45b597cb837"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-d02619a6c67ae04aeaac25ea0fafe60417a82411de0bad9c52d8ff5fca1e34b6b95861e81547932598b4d31f4d6bec4bff2218dd1c8047ac10945cd3e2fd2c1c"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-d02619a6c67ae04aeaac25ea0fafe60417a82411de0bad9c52d8ff5fca1e34b6b95861e81547932598b4d31f4d6bec4bff2218dd1c8047ac10945cd3e2fd2c1c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-d02619a6c67ae04aeaac25ea0fafe60417a82411de0bad9c52d8ff5fca1e34b6b95861e81547932598b4d31f4d6bec4bff2218dd1c8047ac10945cd3e2fd2c1c"' :
                                            'id="xs-controllers-links-module-UsersModule-d02619a6c67ae04aeaac25ea0fafe60417a82411de0bad9c52d8ff5fca1e34b6b95861e81547932598b4d31f4d6bec4bff2218dd1c8047ac10945cd3e2fd2c1c"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-d02619a6c67ae04aeaac25ea0fafe60417a82411de0bad9c52d8ff5fca1e34b6b95861e81547932598b4d31f4d6bec4bff2218dd1c8047ac10945cd3e2fd2c1c"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-d02619a6c67ae04aeaac25ea0fafe60417a82411de0bad9c52d8ff5fca1e34b6b95861e81547932598b4d31f4d6bec4bff2218dd1c8047ac10945cd3e2fd2c1c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-d02619a6c67ae04aeaac25ea0fafe60417a82411de0bad9c52d8ff5fca1e34b6b95861e81547932598b4d31f4d6bec4bff2218dd1c8047ac10945cd3e2fd2c1c"' :
                                        'id="xs-injectables-links-module-UsersModule-d02619a6c67ae04aeaac25ea0fafe60417a82411de0bad9c52d8ff5fca1e34b6b95861e81547932598b4d31f4d6bec4bff2218dd1c8047ac10945cd3e2fd2c1c"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateMetaOptions.html" data-type="entity-link" >CreateMetaOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/patchPostDto.html" data-type="entity-link" >patchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});