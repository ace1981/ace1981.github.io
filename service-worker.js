/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["2017/03/29/dockerstart/index.html","b8aae076a113d5f75dd9418aaa919ed3"],["2017/03/29/hello-world/index.html","d2ae9191bcf3d7671ca3d2ef459cbeaf"],["2017/03/30/ddd/ddd.jpg","c193b810d3ed2cdcb773483cefc42254"],["2017/03/30/ddd/index.html","d5520330f46fad738f9855bb1d90a8e1"],["2017/03/30/javastack/index.html","c48fc16766faba51344afaa1461304be"],["2017/03/30/javastack/javastack.png","98adf119c8fd2a02175b311ee389c0ce"],["2017/03/30/jvm/index.html","b1730f20d76263332036bcefb1fc830d"],["2017/03/30/jvm/jvm.png","5268a5ba366024afdca716fcf7153c17"],["2017/03/30/pd23/index.html","bb2629b39c2ea0c7d149a251f67a00fb"],["2017/03/30/pd23/pd23.png","33238e2eb51748b9de73201ff0861093"],["2017/04/04/git-ssh/index.html","3d27490a3784439040335d0a6ea50f34"],["2017/04/04/jenkins/admin.png","b39794133b52c2e14956905bade76bb3"],["2017/04/04/jenkins/autobuild.png","2d863dfc18215e039675e13e1c17c8e2"],["2017/04/04/jenkins/buildjob.png","501d56fffdf0f1276af35fad1903264f"],["2017/04/04/jenkins/consoleoutput.png","685961919bb2efb3144676ed8557a34e"],["2017/04/04/jenkins/customize.png","e455bf4c9f17a6b74d46d82c6cc4506d"],["2017/04/04/jenkins/deploy.png","c6e7b41a80aa145844de85e659996863"],["2017/04/04/jenkins/deploytomcat.png","fef4d1f6923c195ddc37857cf0c93c9f"],["2017/04/04/jenkins/globaltoolconfig.png","60edd2c4c526a18f1e4278873163c2cb"],["2017/04/04/jenkins/index.html","f8e8bfaca04f43e7df1002aca8c8eaf9"],["2017/04/04/jenkins/install.png","1597eed8c9f9edbc1cc556df3f71e66f"],["2017/04/04/jenkins/installingsvn.png","63d1aec9213804328a7f8efe5a675bcd"],["2017/04/04/jenkins/jdk.png","776e634707b8cd5a30c3d8526cd53b24"],["2017/04/04/jenkins/jdkandmaven.png","6ec89011c75bb983f70e4e55e55bc094"],["2017/04/04/jenkins/maven.png","40e2df2e5e75f0a8dce8100a1407c0c7"],["2017/04/04/jenkins/mavenbuild.png","13b43cc9e9832ebd80ab1da230e1501b"],["2017/04/04/jenkins/mvn3.png","a4fcaa2a1ea78ae12529db6f410d0082"],["2017/04/04/jenkins/newjob.png","fcd3610c3cccb6f0a9f36c2ba89a2c79"],["2017/04/04/jenkins/oracleuser.png","79a8377be3bee0ee8a02f673a83f792f"],["2017/04/04/jenkins/plugin.png","b6c247720cb60da0d2b13f2a86a13a02"],["2017/04/04/jenkins/readytouse.png","454afa082f0518f1404182bd1edcbe24"],["2017/04/04/jenkins/startbuild.png","2e22b97b12c7d116f2c8d19f82de6e66"],["2017/04/04/jenkins/svn.png","ed99658cd7428e1b287b615e7bf2ccdf"],["2017/04/04/jenkins/svnpass.png","ba127499003cc02827f8d632f0e00fde"],["2017/04/04/jenkins/svnsetting.png","81be31c4a4a630c4c00720a0cddb4ae4"],["2017/04/04/jenkins/system.png","fa99e896c7ef8ba665f9c9172718aecc"],["2017/04/04/jenkins/unlock.png","b516302cba8a107f63368e76c3d41997"],["2017/04/04/kubernetes/index.html","4e2da63a19e88cf3b87d64e139d8c31d"],["2017/04/04/vm-ubuntu/index.html","c76a61ded99c694a8cd030bf5aabb202"],["2017/04/05/weixin-sendpack/index.html","8f621c371b95c08bff90e4e0ebbd2aab"],["2017/04/07/tomcat-docker-steps/index.html","1cfba4af93ff6dff6caecf79165bbdeb"],["2017/04/10/docker-compose/index.html","28c429c76614aa669503ec75cd23fb83"],["2017/04/10/docker-svn/index.html","d81027c9beca3355bf354c51f3ff33c2"],["2017/04/10/dubbo123/index.html","1cfc8121097e58630990159d0ee64205"],["2017/04/10/zookeeper-in-docker/index.html","5422fc3a173610e23d839b91b5f7f634"],["2017/04/17/todo-list/index.html","62e10234b521fe70992413e07c2a16c8"],["2017/04/18/docker-mysql/index.html","24d7dc11ed586865f2ffae0e4b42d63d"],["2017/04/19/dubbo-springboot/index.html","b628259001c635aebb926e966d8976db"],["2017/04/20/springboot-mybatis/index.html","df1b0ccf557b9f4ac51b40268a4741f6"],["2017/04/23/docker-activemq/index.html","d29c908f395f12380615d51b9f86a903"],["2017/04/23/docker-elasticsearch/index.html","9d73d7e830c27e050c76fb2caf192430"],["2017/04/25/container-tech/index.html","c87fc3f46bd83e36a053a0059ebf5ec7"],["2017/04/26/ubuntu-svn/index.html","729238e17f92989d1220dc6e55f8a498"],["2017/05/04/java-optimizing-1/index.html","ec6111ebe4c8407e4e592a1866cf6bf1"],["2017/05/04/java-optimizing-2/index.html","87278a9997c2c16d71f081f025f4dbdb"],["2017/05/04/java-optimizing-3/index.html","2fb847a8201feb79f83dce51526a0af8"],["2017/05/04/java-optimizing-4/index.html","2f00b75c60efca6f3f4f44142fd13d5e"],["2017/05/04/java-optimizing-5/index.html","dda3ae4590ff237dc3e38560bbef7e7a"],["2017/05/04/java-optimizing-6/index.html","49c8308bf6518b7e26412ab09d22be05"],["2017/05/04/java-optimizing-7/index.html","1273593f723ec8a2f0d4594b05b6f44d"],["2017/05/04/java-optimizing-8/index.html","89246598113b2186e0e42ac1465ec40f"],["2017/05/05/ubuntu-nginx/index.html","e7ccd0bf2751aebb0ec057f15fe770dd"],["2017/05/06/java-collections/index.html","d960de525af7739e1089213dbd0b5c90"],["2017/05/15/docker-kibana/index.html","f42443dcea2e870060b6d434b4dc6318"],["2017/05/15/docker-logstash/index.html","e3cb7c6d7a8d2be0cd7cbf5eae187e64"],["2017/05/16/elk-springboot-log4j/index.html","bc6ad338a800e33f3d8a554291fc1c25"],["2017/06/19/angularjs/index.html","8e6f5aeb1fb8e664cf499a0a355f979d"],["2017/07/21/tensorflow-start/index.html","8a1c7d7c0c4e8461041274e26bc48c0a"],["2017/07/25/sql-script/index.html","759e79b48b7500fbf9462dd91715c82e"],["2017/07/26/common-scripts/index.html","b3d79e9e6992c3f5dcc3404fed3f6f8c"],["2017/07/28/datascience-1-python/index.html","c84b5ea3b866df09c0bf98a7d79dfdcd"],["2017/11/18/lombok/index.html","370fddf890f32b9b156326c98d6fcb03"],["2017/11/19/cassandra/index.html","0643c188f9b6b3174cf5d9bf44122fbb"],["2017/11/19/eclipse/index.html","237ceadcf9957305e60991c15c9869d2"],["2017/11/19/flink/index.html","53435b7353ddde44398812f795d65045"],["2017/11/19/flume/index.html","0055fc1adb0eb99eac31b058074a8645"],["2017/11/19/hadoop/index.html","6c4b330a00441587e57e494e13aca26a"],["2017/11/19/hdfs/index.html","a2188e3dba4d1c899e5d480959fc43f6"],["2017/11/19/hive/index.html","277beaf79de7c114c01278955059872a"],["2017/11/19/kafka/index.html","37a9047d97441ae09c15e48ffae48d3b"],["2017/11/19/logback/index.html","69a623b957617988f5e6fd50d3a5ae7d"],["2017/11/19/mycat/index.html","b2dc77a41a71d762275cad171cb861b7"],["2017/11/19/spark/index.html","ac49950ea36f7f5136bb053ca9e3e052"],["2017/11/19/storm/index.html","8909988d5c2412402f9f79404c355267"],["2017/11/19/swagger/index.html","386677e25a0420892b63868c694e88e7"],["2017/11/29/HandlerInterceptor/index.html","1ae89df243d1ade077669ecc0b4a1811"],["2017/11/29/freemarker/index.html","7ac6f51f3c3ab285e80bdac47b9dacb4"],["2017/11/29/hbase/index.html","4aea343e04f4c424abc1cdc49e2d6bf0"],["2017/11/29/kettle/index.html","cf6726cbf24e14213209a808254acf00"],["2017/11/29/shiro/index.html","e51d86a1e2f7c86d35d97852eafc78a7"],["2017/11/29/thymeleaf/index.html","f87e2ee5ebcc5733aa3fdb1fe2763947"],["2017/11/30/mybatisjpa/index.html","5b271c71374dac86d64003f4cd770659"],["2017/11/30/statsd/index.html","512d98092221896c22c28d6073b557af"],["2017/12/01/metrics/index.html","b361fb2273e4d317bebb022fc46814ad"],["2017/12/03/jms/index.html","b4a311ccf5f87bf6374653e392bf6fcf"],["2017/12/05/elasticsearch/index.html","dba61911c1291e2c4be5b61056c45b59"],["2017/12/07/grafana/index.html","f6354fb401596984ebadc467a6e7af1f"],["2017/12/07/graphite/index.html","a991b630892054171bbda380a15221e4"],["2017/12/07/influxdb/index.html","a9f485752ce4c316d500a5dfeaff7cb5"],["2017/12/12/linux-bash/index.html","779fec23e2d373f733fb4e39ee6e5ced"],["2017/12/13/docker-registry/index.html","f511644dbc8e56de2b07c439616fd35d"],["2017/12/14/crt/crt.jpg","aae196667058971ceb2ea9083eb5634a"],["2017/12/14/crt/index.html","c96dfbd1dfffbf30121b955bd1203b68"],["2017/12/17/docker-jar/index.html","8e98933eaf4084eb67f4747b218f92ea"],["2017/12/18/docker-base/index.html","68a1f94396b64ee23fd20cdbb1ed9b98"],["2017/12/18/docker-bridge/e1.png","d6d9b82c9d255c3b9d732a07ee94bada"],["2017/12/18/docker-bridge/e10.png","5173773e3b9ff2fe8547ffe2e157b0d0"],["2017/12/18/docker-bridge/e3.png","bc57c342d5092e2bbb84541402e03291"],["2017/12/18/docker-bridge/e4.png","2ce807338af17a42dca0635d8102dc3c"],["2017/12/18/docker-bridge/e5.png","772de72e00fc82a4782362476ebc5d26"],["2017/12/18/docker-bridge/e6.png","0e0c62f0c820bc831df804290f3bed10"],["2017/12/18/docker-bridge/e7.png","e4e854e041a56e24b476de4a5c7242da"],["2017/12/18/docker-bridge/e8.png","eda26fa37297d548b9fd4d6f47f4406f"],["2017/12/18/docker-bridge/index.html","1ee5c4c4dcfef2c4b84d128a7f0409d6"],["2017/12/18/docker-resource/index.html","4003a422d814205d636e7c805d729c26"],["2017/12/18/encryption-algorithm/index.html","a0ac2efa39a954eb46a649e142956440"],["2017/12/18/openssl/index.html","ca216b4fecf4bee7a4db2f8dd904eece"],["2017/12/18/telegraf/index.html","f1ff920f73a5f49dc4b9161bd100e0ae"],["2017/12/20/bat/index.html","fe97b8c1199573facac278bcffa8d357"],["2017/12/20/overlay-network/index.html","bafb1ac4585e1a0f7e54cd4f59d4521d"],["2017/12/20/qos/20110422_1184949_image001_713021_97665_0.png","e46f6538ca6b5041cfd8da0c687d3090"],["2017/12/20/qos/20110422_1184950_image002_713021_97665_0.png","91d5165771b942b03789769046af1ea6"],["2017/12/20/qos/20110422_1184951_image003_713021_97665_0.png","2bf8d8a3bcc4e8723fd1612710fbf4bc"],["2017/12/20/qos/20110422_1184952_image004_713021_97665_0.png","25574c7e2e720cdd5357d2e8beb01886"],["2017/12/20/qos/20110422_1184953_image005_713021_97665_0.png","7a3fd737f12a677d6a87256f57e59d10"],["2017/12/20/qos/20110422_1184954_image006_713021_97665_0.jpg","e18def9884cdc623b278a7678e1523dc"],["2017/12/20/qos/20110422_1184955_image007_713021_97665_0.jpg","1873447123c15a628444f42bba2f06bc"],["2017/12/20/qos/20110422_1184956_image008_713021_97665_0.png","96817bf823faea26ca654adfb95de260"],["2017/12/20/qos/20110422_1184957_image009_713021_97665_0.png","88b2c42491e83ab226d970a4cfcd1c0e"],["2017/12/20/qos/20110422_1184958_image010_713021_97665_0.png","dfcd1a9b6a5f4d5a18d26d6e6ad802aa"],["2017/12/20/qos/20110422_1184959_image011_713021_97665_0.png","ddaba393d6e2205abc567380cf8c6d4c"],["2017/12/20/qos/20110422_1184960_image012_713021_97665_0.png","b6846853e6843173a81916e99e044f9e"],["2017/12/20/qos/20110422_1184961_image013_713021_97665_0.png","52b8286b6f361d78a8c4a5a8d1456568"],["2017/12/20/qos/index.html","13435b79ffecec8ef9db30857e2a9ece"],["2017/12/21/binbash/index.html","d60a796e07f044d372a83d6e980656c3"],["2017/12/21/jenkins-for-docker/build.png","2e1afd74be6cfffa9a2738474a54c2fd"],["2017/12/21/jenkins-for-docker/git.png","5fb740985bc6b4fa2325a1007b6cb55e"],["2017/12/21/jenkins-for-docker/index.html","e9b7c798a1169b5bf51bd2774044fe35"],["2017/12/21/jenkins-for-docker/poststep.png","9e9651a5cf060ec13e0e45a67a50dc1f"],["2017/12/26/activiti/index.html","a410494caad5c0216244774a6c85cd9e"],["2017/12/29/apache/index.html","f34e06e9eab278b9c16b7a0db19a9597"],["2017/12/29/nginx/index.html","bc1e91b565511169538389113c60813b"],["2018/01/01/jmeter/index.html","9d63789f4c73f8e76df59494bc2597a4"],["2018/01/04/document/index.html","b9908ea64e050b5645933049cf2c7356"],["2018/01/12/classpath/index.html","7851c239a7c56c5bbf26a3333cc2bb7f"],["2018/01/12/typescript/index.html","a970d2db5f8b5b1cffddd5402cd1c2f9"],["2018/01/31/elasticsearch-develop/5bcf5a16-a394-4997-aa0d-ecc6dd19940b.png","f3f29434127ca99ca09172992b01d247"],["2018/01/31/elasticsearch-develop/79cf5f34-ff75-4baf-a39a-2039b08fcb71.png","07896351aaf4c8687dc80c9d3f70a48b"],["2018/01/31/elasticsearch-develop/7a8ac7a1-2352-4db3-8b69-97c0f3ba04fd.png","2195c04ae225ad23a132329e9981db76"],["2018/01/31/elasticsearch-develop/881299781.png","ea75b2c6f69b22b7a6affa82441bd01a"],["2018/01/31/elasticsearch-develop/881459500.png","cc3284542617cf7320b01dd04eaceec2"],["2018/01/31/elasticsearch-develop/a6025996-2128-4e00-97c8-78c0aeb7622d.png","1f76d81d5425921549e4719c6658f0ff"],["2018/01/31/elasticsearch-develop/ab34c966-81c4-421a-affb-29024b8a4041.png","782067f5828a10cbdb4e4d9a6aa7ce08"],["2018/01/31/elasticsearch-develop/index.html","3fd679e403d23d83a555edda96d0d72e"],["2018/02/25/maven/index.html","18d428ce5258e2dd43474afa8736df41"],["2018/02/27/encoding/index.html","03a54346de515f8b47f1a0648990d302"],["2018/05/02/spring-data-redis/index.html","383c8f1774d4dab8968f394213b2dced"],["2018/05/11/maven-plugin/index.html","98616b9b6a4d1a293d75565dc0dde8a5"],["2018/05/11/scheduledthreadexcuter/index.html","fa2dd9c90ec0f8d0644f5c08a4d12fa6"],["2018/05/11/threadexcuter/20160221172500424.png","af254e68ad0f0f3cc25eec5ae79ce878"],["2018/05/11/threadexcuter/index.html","456f9b6dbdbbbbe971d9a68dc9a29e37"],["2018/05/16/linux/index.html","e8732f1c5133015cd3b4f5a1fcd2b5bd"],["2018/05/17/java-multi-thread/18152411-a974ea82ebc04e72bd874c3921f8bfec.jpg","90f26580297a213b4f82bf4dfe37d680"],["2018/05/17/java-multi-thread/index.html","4cd8865add07546f482f61f8aa94d0bf"],["2018/05/18/java-multi-thread2/index.html","9ed1e137a0e42d8756f7bb76f9f4280f"],["2018/05/18/tomcat-outofmem/index.html","275bf58825eb6bbc3fe9b58e58faf0d1"],["2018/05/18/tomcat-setting/index.html","97300295e55a3f07b22e5fd22bf18310"],["2018/05/22/jpa-native/index.html","b8990f6e7409da04018128edd8d26bfc"],["2018/05/23/linux-date/index.html","aafd2b3e74bbb7364ab452b337545c2c"],["2018/05/25/jpa-multi-table/index.html","a36c92e2b3155aa8280eda39c4a17960"],["2018/05/28/need-read/index.html","b8b7ad0eecf2c98742ddb31fddcb442a"],["2018/05/28/pom-xml/index.html","d360665ed2386cbaa0b6c3e4f5f97f33"],["2018/05/28/spring-xml/index.html","cee1f6d03171d2a6fe2e4ecc4f95018f"],["2018/05/28/tomcat-xml/index.html","3419e5acce9741cacd4be863bb4a9933"],["2018/05/28/web-xml/index.html","3aedeb9637ff2d9f25bab0df5d08af76"],["2018/06/02/activemq-linux/index.html","ff078ffad91a4c501f542402c4bbffe8"],["2018/06/02/atomicboolean/index.html","f9f5269d2448bda45204398567cdc4c0"],["2018/06/02/firewall-cmd/index.html","dd5e08223ec8c6dd1dd3beec0c91dc99"],["2018/06/02/interrupt/index.html","3c27eac22e3c712f8fadd9ba05b75d79"],["2018/06/02/postconstruct/index.html","4c33df3b0e8b6a2d879bc3e98b8e10f6"],["2018/06/04/jquery/index.html","00a28e0143dd791b3e34e1790c4ba5ef"],["2018/06/07/angular-directive/index.html","97c0d406bfad2c8d4ebee25ad9258a39"],["2018/06/07/eclipse-clean/index.html","3f902a7c7218900b78912681d3e325a3"],["2018/06/14/bower/index.html","d2e1765d3e861a26b821a7dbbfe38f0e"],["2018/06/14/jpa-manytomany/index.html","292c6a74ceb96b70ca0bb3e28f59218c"],["2018/06/14/js-package/index.html","ac005672cea6046325204ac63f0fb163"],["2018/06/14/npm-package/index.html","408006d4b411c53a66b93558335c7d19"],["2018/06/19/ng2/index.html","a9e7726d26d3a12a9fd7e859c3465194"],["2018/06/28/oracle-connection/index.html","af1d4d822a6a6a255305ad09ab12151b"],["2018/06/29/jpa-manytomany/index.html","e72c102d6e3117e5d0b8354a81f32387"],["2018/07/12/angular-cli-json/index.html","6dbfc619b88917825a27f8b3e24965c6"],["2018/07/12/pwa/index.html","82a0d3ae2d6c4f72a7b4fb4bd0ab0f77"],["about/index.html","067e1c813f12bd70621ccc11150070b2"],["archives/2017/03/index.html","f35c94a2e30e8cb9e8d8a35a3a2ef38f"],["archives/2017/04/index.html","b8fd24068354d9a0cad5ca610b38bd71"],["archives/2017/04/page/2/index.html","b87111d4038ea5f135e32def6d29d773"],["archives/2017/05/index.html","495e8b2566392dcae8cbd6d541605ee2"],["archives/2017/05/page/2/index.html","8e1b3143e685d87237a33fe4e878c8e8"],["archives/2017/06/index.html","3e6d8944e5bd3602520ccffa01544bd1"],["archives/2017/07/index.html","8f00434c9068f3f6a681809320f4d8d8"],["archives/2017/11/index.html","42c76e1fc2af8b8d8919017108f58740"],["archives/2017/11/page/2/index.html","2e759b11cf38cab1b32a7c3755422e7a"],["archives/2017/11/page/3/index.html","85bf455aa4956315b7b6169c815d7d84"],["archives/2017/12/index.html","ac7289252324f22d728a4d586cf4480e"],["archives/2017/12/page/2/index.html","5b16efa8a25587c9f791e9060f8c8ed5"],["archives/2017/12/page/3/index.html","be7e9d831c1666518c6884d430231702"],["archives/2017/index.html","727d8cd0538cd80e2a2fa27c171d6c95"],["archives/2017/page/2/index.html","26d1f19ab1bf1b0601a6054f6c1e65db"],["archives/2017/page/3/index.html","33644b1c72ed5e357523cc5e66a8dbb7"],["archives/2017/page/4/index.html","777e1b89af97537a57041e64174c0038"],["archives/2017/page/5/index.html","711d7b4b0674571ccb9ab1f098c99b37"],["archives/2017/page/6/index.html","9655f4124fc2c8c2b9908657a515a0be"],["archives/2017/page/7/index.html","1a1ca0042d078488bcda5f242bb61987"],["archives/2017/page/8/index.html","520c45cf260b0fe107867fe834ac9ae3"],["archives/2017/page/9/index.html","6081a04847ff78775402809898fc00e5"],["archives/2018/01/index.html","bbe3cadd5423b623ddf74dd7784406cb"],["archives/2018/02/index.html","98629cb9f1f8178a2b4d6dd3032b6df5"],["archives/2018/05/index.html","1bc5d3af1ace0717f8de211d0dc50409"],["archives/2018/05/page/2/index.html","4f3cf85b3e9fe2f9ca6110b77d286892"],["archives/2018/06/index.html","e79c3a536b879fb625655d4bac54381c"],["archives/2018/06/page/2/index.html","898a8054edfe5d249e7e0d7e981f8231"],["archives/2018/07/index.html","df83e2b5d9497779cdee17e92401c8f5"],["archives/2018/index.html","2de436eb0602c0865a88c26fc9bfc80f"],["archives/2018/page/2/index.html","cff74d564e41c3bbeedfed95b6acf3f6"],["archives/2018/page/3/index.html","d6ab905aad8d76cc10fc78a46fc32337"],["archives/2018/page/4/index.html","8b901a139d04715a4004800576269239"],["archives/index.html","788f3f8b312dc6800838bf731b476b2d"],["archives/page/10/index.html","3874861d108d868ffdbabde9ce463a8e"],["archives/page/11/index.html","92eaa2d3eefe10370c9c85b5676c0470"],["archives/page/12/index.html","86715b2389e200e80362cf98104fab93"],["archives/page/13/index.html","cee1214f0f793d57b6dacaa0cd950cab"],["archives/page/2/index.html","e4cf5c76d94d60e501ab1b9f4af340f0"],["archives/page/3/index.html","c98d62ef3e161df2639e918232e7513a"],["archives/page/4/index.html","d7965f49a55c32bcb765415f8de22613"],["archives/page/5/index.html","b32d11978c57552db23cabb868b562aa"],["archives/page/6/index.html","cf005232dd0dc4a7c77c6e6f2c074bde"],["archives/page/7/index.html","86360403dd51662ca12934b0012351d0"],["archives/page/8/index.html","1696f30cce6707e95375683a42c7eb94"],["archives/page/9/index.html","903a9dc2770ab8ef43a2d44c2957f94b"],["categories/docker/index.html","95024678afd75ba6a91bebfa9c41f1fa"],["categories/docker/page/2/index.html","c30c24eb3b5ac0dbb85f4345387442b1"],["categories/docker/shell/index.html","10f55c05d42ffb927452e91cafd69ffe"],["categories/etl/index.html","5d9da01f33b1b13e8c7bd833dc6095b8"],["categories/index.html","7b9e5936813e1d1a270470a4123767af"],["categories/index/index.html","5cc53e5570639a9f0bd09d0a2adf126a"],["categories/java/index.html","f6251040bafdd7cc7debca4b8b8801d8"],["categories/linux/index.html","e6e574c3f857b653ec174d338c2ed696"],["categories/shell/index.html","0ddd4af6f4420400f2bf9a2cd99463f0"],["categories/springboot/index.html","263e9a26430f94273598a2f81d21b8b4"],["categories/web前端/index.html","222d5e31129be83ed82160d07431b98d"],["categories/yan-li/index.html","c47d8ccc3c63e6b030d4be3218211d4e"],["categories/代码管理/index.html","2e1c542bd249a5bb7191f2f2a813a1dc"],["categories/分布式/index.html","1a68f22922969ae620bf5a1897c87b2a"],["categories/大数据/index.html","f53787d6065de1dd77c3deadbc62bcba"],["categories/容器编排/index.html","e00cb0df16fc469a369e0df1ce57ea9a"],["categories/工作流/index.html","eab7b82e3cb3f111678e7a0c3bb6df3e"],["categories/开发工具/index.html","10a4ff1c04134afe1e945853b7a055ae"],["categories/性能优化/index.html","4d3ee57e53de4971f963af664f8a5c9d"],["categories/持续集成/index.html","baf935065b2e693f02a5552d0e829299"],["categories/搜索引擎/index.html","95371bb4b690837e145380dc1c65698a"],["categories/数据安全/index.html","6ba661b14cf509665579a0cd8a839034"],["categories/数据库/index.html","2a22a3f35a9219a18cbc3e4f6f71f511"],["categories/日志收集/index.html","7d64290258d28a383804e82ee96adb44"],["categories/服务监控/index.html","0199d93cf1871f7ddb224e3e88b09772"],["categories/机器学习/index.html","cc6f532aa564189658befa37a98fdbba"],["categories/框架/index.html","4196ee06c2b9eefd0b7b355591afb618"],["categories/流计算/index.html","9c69a32a1b4135d75b7b864a785f09fd"],["categories/消息队列/index.html","8c20330bb94d66b434a5276fca0be3d0"],["categories/第三方支付/index.html","f6efdb098c28b074ac171d547506ab86"],["categories/网络协议/index.html","eab259b436184aa4edffd2ab9ae27f27"],["categories/负载均衡/index.html","57cc278df18724ab909c9d604a82ae5a"],["css/main.css","8277e886bec4d25e59fefaa4c2659f6d"],["css/source.css","9cfd2fab0a69799fb775f89880f75c01"],["css/typing.css","414f6b2324a44d5ab0d4ab34f6312f50"],["css/wordcloud.css","5ca0f14978e54fbabd4434daabcabce0"],["css/wordcloud2.css","f00685cf89dfe84bace3fd1d199004ed"],["fancybox/blank.gif","325472601571f31e1bf00674c368d335"],["fancybox/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["fancybox/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["fancybox/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["fancybox/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["fancybox/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["fancybox/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["fancybox/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["fancybox/helpers/jquery.fancybox-buttons.js","f12190546a9cc3cf28c99ce3839c35ae"],["fancybox/helpers/jquery.fancybox-media.js","a43c71c37d726096a48b0d6d654dc25c"],["fancybox/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["fancybox/helpers/jquery.fancybox-thumbs.js","b3d9cb05b56033141ae6f6358df2763f"],["fancybox/jquery.fancybox.css","fd7de7df5125265bbd78984d637cf90d"],["fancybox/jquery.fancybox.js","627b3fae16845d1942d3cd4270098111"],["fancybox/jquery.fancybox.pack.js","b6d0034563763b4bb7da451d54301c9f"],["images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["index.html","d4be49dbb473e0001b77482b70134816"],["js/jquery.min.js","b354cc9d56a1da6b0c77604d1b153850"],["js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["js/src/utils.js","d1ee25b7823708d89469b27b6232257c"],["js/typing.js","d5789b38a2b4ce6d87dbe5899ee62a06"],["lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["lib/fastclick/README.html","b3cd6e7f930bf6e410a2e7eab8a148a8"],["lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["lib/jquery_lazyload/README.html","d89aa4afe316331a25b636b5ead4716e"],["lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["page/10/index.html","d842c3d44d5426904b7a8467afec087c"],["page/11/index.html","3e838236b742cc1b7e5327f3e7497e34"],["page/12/index.html","42a74f12fbf52673644249e05e702c9e"],["page/13/index.html","a53d32a663df379639eda5ae097c2b75"],["page/2/index.html","50f1607bc4f4590fa499b7aa9fac3a74"],["page/3/index.html","2f355df7b43da5d70a487ae5154896a6"],["page/4/index.html","21395b524ac828a12ec5ae8e5eb5dd46"],["page/5/index.html","fa5877c55e362d0ea3610a5f067172f3"],["page/6/index.html","ad41433ce93f9d1fe0f72976abe59679"],["page/7/index.html","690bae2f5714340a9b61810418dd9d44"],["page/8/index.html","d30cdb2bae6d1982f7e9cd3369976d06"],["page/9/index.html","e035eab629d37696edf210436a297890"],["tags/activemq/index.html","9ead99fbbb50252568c6143f40711b1d"],["tags/aes/index.html","10f65607e0854fbbe896904bd58aa9ba"],["tags/angularjs/index.html","787eb8ff6cebafb1ac854b04480f4034"],["tags/base64/index.html","a9eef7932c5661f0aebcab9ecff14241"],["tags/bat/index.html","5327d82c77006a2c868e5b877a6159a6"],["tags/cer/index.html","406ee19fd5121c2b7a451444aecd431d"],["tags/crt/index.html","f1a7237d375bbe7d2a3747e7c8c4014e"],["tags/der/index.html","2ad88d0cc47c4e07b8f584b4988c7b20"],["tags/des/index.html","4f917ec8ed2be558437867bf4356c9f1"],["tags/design/index.html","071bf29f0a23f6cdaf8fb55962493252"],["tags/designpattern/index.html","9b2b80708086369fd1e00992dfbeae70"],["tags/docker/index.html","a639edc219bbf07aa26b250b38e25e23"],["tags/docker/page/2/index.html","f1b8868f128c28d37cb9f3449bb082bb"],["tags/dubbo/index.html","b0b26e698b6611d632fdcbe2e98b36ef"],["tags/elasticsearch/index.html","870412ae4f785b74b82eef801ea92af9"],["tags/etl/index.html","26453ca4fe2e9f528b90385450f815b8"],["tags/freemarker/index.html","e93dbb23a68bda1542cb77ce01891856"],["tags/git/index.html","cb148d66107a6816cc7b0378b6878edf"],["tags/grafana/index.html","dd45969a61da5acfb834abcf8a7f4e00"],["tags/graphite/index.html","f85f53f0ad8c0911a66683a298cbd7bb"],["tags/index.html","2463855b40ce1b9ade61ccd5c7a4436f"],["tags/influxdb/index.html","153dc3e1992ad17be317643e34f9cb3f"],["tags/java/index.html","8fa93450840338b00fedd6c3fb327379"],["tags/java/page/2/index.html","7dec093307964159b64707dd21d93b61"],["tags/jdk8/index.html","38b014d219d6a9be0640358ea6e289ce"],["tags/jenkins/index.html","ea12570b54738f15b681a6e7fc1f11ae"],["tags/jks/index.html","8fba24ab3b90f7ebed7ee6aed6828db9"],["tags/jms/index.html","0cda83cf0690ba4157f2beeb6e1f5a3b"],["tags/jpa/index.html","9587a2bf71ee751bc30541227652577e"],["tags/kafka/index.html","b4f8b093d24d4e81f179064e9e4f982c"],["tags/kdb/index.html","a55472c7bd2edf1b9a114f240b49a8ac"],["tags/key/index.html","5f7c4b0e310a7ea71ba9c05d5d0bf897"],["tags/kubernetes/index.html","c1184c356d06560036f9712a1cbd0d2e"],["tags/linux/index.html","8bd26b7a0cc74e8a256cb212e84b1852"],["tags/loadbalance/index.html","fc4c3cb5fccd9cd6d61661dde0e5a011"],["tags/log/index.html","9b90076401e393b4b59dc7062ecb2fa9"],["tags/lombok/index.html","1411e9e40733c3cad1316783ef736a20"],["tags/maven/index.html","6cc1581f5c119dbbaf7a2b336270a306"],["tags/md5/index.html","754eb4fc016095f9a28223f76133d8af"],["tags/metrics/index.html","6e7bd1f6c3cf6969388a9fc21f3687b7"],["tags/mybatis/index.html","ca2aee9dc90bd7943a980f440a3af28a"],["tags/mysql/index.html","64b91554d2e680897ca3df63fbf80399"],["tags/network/index.html","92065f998f076cce8cc53799cb5cc2ab"],["tags/openssl/index.html","d2d0848119709748daa1315f01e37f3d"],["tags/p12/index.html","58b3060f25ba9a33d91ba5b0589c2d0d"],["tags/pem/index.html","ba5a7fe4b5f5ac8680a6deb7e205e203"],["tags/pfx/index.html","8ce3db1246dc1777d4458d4f89bb9680"],["tags/pub/index.html","e0e2906abd449beff645fe267b3e5f42"],["tags/qos/index.html","500a4d56be08590c6e35dbe0da066a20"],["tags/query/index.html","e85b5f0bc2a04b227878b1960cba9e39"],["tags/registry/index.html","8d3fbf6e13977e54cea8f07311cd712a"],["tags/rsa/index.html","612fb0eadecdf7d68965f8d601fddad5"],["tags/sercurity/index.html","cb4879e5a2b5211f8cfca3796c1653fb"],["tags/sha1/index.html","009951ececdd692dd1a035d604f2e35b"],["tags/shiro/index.html","ad4e87e12fe76cc30686d6c89a4b8e43"],["tags/springboot-dubbo-dubbo-monitor/index.html","59702b9cd34cb1dcf46ff6db1cf5c71a"],["tags/springboot/index.html","2a80c39518920d9622bafea8be3cca39"],["tags/statsd/index.html","50aa032059c220d8dce5d5c24f45ceb0"],["tags/svn/index.html","4bb7bcb583dbaddb6be927a9306c32f6"],["tags/telegraf/index.html","fe1b0651c43531743b77b619f127dcd4"],["tags/tomcat/index.html","b38196de75a24584b716ba2fedc67a3e"],["tags/ubuntu/index.html","89d99b0a533bd61f6f298848737e2f4f"],["tags/workflow/index.html","293f8ea7221b74669aff26e15142228f"],["tags/zkui/index.html","44c383df22340c9e64e028874d7034ca"],["tags/zookeeper/index.html","16c715e5c5cc321f70d5b1b3f345a457"],["tags/支付/index.html","e7a0ff522fe722a40237810a81e16cf7"],["wordcloud/index.html","07dba0b61983e9cd92c045d8ef48f859"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







