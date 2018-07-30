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

var precacheConfig = [["2017/03/29/dockerstart/index.html","56ca57435d66c94be195ecd843356aa0"],["2017/03/29/hello-world/index.html","6a38253184fb84ca40f9f15247e9183c"],["2017/03/30/ddd/ddd.jpg","c193b810d3ed2cdcb773483cefc42254"],["2017/03/30/ddd/index.html","36be7ee940694a0f42161fb34431477b"],["2017/03/30/javastack/index.html","57d1521d70d05e73784c7cdfda1143bc"],["2017/03/30/javastack/javastack.png","98adf119c8fd2a02175b311ee389c0ce"],["2017/03/30/jvm/index.html","614dbde39e736ef6e0db2f44a62e09e2"],["2017/03/30/jvm/jvm.png","5268a5ba366024afdca716fcf7153c17"],["2017/03/30/pd23/index.html","2e8d5f550adad31415c44e13fff59feb"],["2017/03/30/pd23/pd23.png","33238e2eb51748b9de73201ff0861093"],["2017/04/04/git-ssh/index.html","369ac66da058c346ad0f5aa97a575239"],["2017/04/04/jenkins/admin.png","b39794133b52c2e14956905bade76bb3"],["2017/04/04/jenkins/autobuild.png","2d863dfc18215e039675e13e1c17c8e2"],["2017/04/04/jenkins/buildjob.png","501d56fffdf0f1276af35fad1903264f"],["2017/04/04/jenkins/consoleoutput.png","685961919bb2efb3144676ed8557a34e"],["2017/04/04/jenkins/customize.png","e455bf4c9f17a6b74d46d82c6cc4506d"],["2017/04/04/jenkins/deploy.png","c6e7b41a80aa145844de85e659996863"],["2017/04/04/jenkins/deploytomcat.png","fef4d1f6923c195ddc37857cf0c93c9f"],["2017/04/04/jenkins/globaltoolconfig.png","60edd2c4c526a18f1e4278873163c2cb"],["2017/04/04/jenkins/index.html","95f820c38b50ff7671a629250d7358fd"],["2017/04/04/jenkins/install.png","1597eed8c9f9edbc1cc556df3f71e66f"],["2017/04/04/jenkins/installingsvn.png","63d1aec9213804328a7f8efe5a675bcd"],["2017/04/04/jenkins/jdk.png","776e634707b8cd5a30c3d8526cd53b24"],["2017/04/04/jenkins/jdkandmaven.png","6ec89011c75bb983f70e4e55e55bc094"],["2017/04/04/jenkins/maven.png","40e2df2e5e75f0a8dce8100a1407c0c7"],["2017/04/04/jenkins/mavenbuild.png","13b43cc9e9832ebd80ab1da230e1501b"],["2017/04/04/jenkins/mvn3.png","a4fcaa2a1ea78ae12529db6f410d0082"],["2017/04/04/jenkins/newjob.png","fcd3610c3cccb6f0a9f36c2ba89a2c79"],["2017/04/04/jenkins/oracleuser.png","79a8377be3bee0ee8a02f673a83f792f"],["2017/04/04/jenkins/plugin.png","b6c247720cb60da0d2b13f2a86a13a02"],["2017/04/04/jenkins/readytouse.png","454afa082f0518f1404182bd1edcbe24"],["2017/04/04/jenkins/startbuild.png","2e22b97b12c7d116f2c8d19f82de6e66"],["2017/04/04/jenkins/svn.png","ed99658cd7428e1b287b615e7bf2ccdf"],["2017/04/04/jenkins/svnpass.png","ba127499003cc02827f8d632f0e00fde"],["2017/04/04/jenkins/svnsetting.png","81be31c4a4a630c4c00720a0cddb4ae4"],["2017/04/04/jenkins/system.png","fa99e896c7ef8ba665f9c9172718aecc"],["2017/04/04/jenkins/unlock.png","b516302cba8a107f63368e76c3d41997"],["2017/04/04/kubernetes/index.html","dc50e1ac24fbdd699a97098adce089f1"],["2017/04/04/vm-ubuntu/index.html","4df18cd48b79eec1d9d77b80569d37e5"],["2017/04/05/weixin-sendpack/index.html","8a1eb84fbde1d471c9a74efb38ab5135"],["2017/04/07/tomcat-docker-steps/index.html","ca58def184479bbc1383cca825980f9d"],["2017/04/10/docker-compose/index.html","3c6a305377d8a38f6391726393c7d58b"],["2017/04/10/docker-svn/index.html","50a2d5743c7cbb650fd0a89a57a34c44"],["2017/04/10/dubbo123/index.html","3db910bad883f35d32333511681c7e54"],["2017/04/10/zookeeper-in-docker/index.html","8f090951823d6252aa9aa749c003176d"],["2017/04/17/todo-list/index.html","86d8751f39cb74527452d04184d8ba67"],["2017/04/18/docker-mysql/index.html","1a91bf727000cd22857e758ed1bb6d37"],["2017/04/19/dubbo-springboot/index.html","110295e83b96283f0b21a2487e40ab83"],["2017/04/20/springboot-mybatis/index.html","be07df3f795d310f3214571143047cfe"],["2017/04/23/docker-activemq/index.html","0fb4e114606743d10f36b7596041d065"],["2017/04/23/docker-elasticsearch/index.html","6d5ee4fb4147dcf7472dbe3815eca20a"],["2017/04/25/container-tech/index.html","aba0fd80d13485ef4bf8896d1e751bb4"],["2017/04/26/ubuntu-svn/index.html","beb8d430773cfc32bfa1695daf6e583f"],["2017/05/04/java-optimizing-1/index.html","688d71bd15caac6bdc3a2b33fdefd96d"],["2017/05/04/java-optimizing-2/index.html","7d1f1976c19aa876f2763214c4e54179"],["2017/05/04/java-optimizing-3/index.html","fea0703187fc1e7e75166808fefddf75"],["2017/05/04/java-optimizing-4/index.html","35c7931af819571d21fd8a63c75a2344"],["2017/05/04/java-optimizing-5/index.html","15f7ad18a012ffc2432072784a620293"],["2017/05/04/java-optimizing-6/index.html","f1253f87f435b8a824a40a15873c2a14"],["2017/05/04/java-optimizing-7/index.html","73b1c8d006c9db942740fba9d220d0d2"],["2017/05/04/java-optimizing-8/index.html","fd5dc52d0eb5061ab7383af6943be358"],["2017/05/05/ubuntu-nginx/index.html","b82064a388e1c054bcfece5f2423181c"],["2017/05/06/java-collections/index.html","0d9ece4754ed6885103e56dfe06b39cc"],["2017/05/15/docker-kibana/index.html","6077e5601dabbaa53ce26045f67fcd4b"],["2017/05/15/docker-logstash/index.html","2f66bec9c510a3c8ec1ae38eb27bdf86"],["2017/05/16/elk-springboot-log4j/index.html","ef4cd196ea06660ceca8916e49254539"],["2017/06/19/angularjs/index.html","c7de5485fbf2658ad43e8fdc6ef719c3"],["2017/07/21/tensorflow-start/index.html","493a8b736d6cf7880eca3608a05f1494"],["2017/07/25/sql-script/index.html","b7fec2f75844447fc89b630a6e6d701c"],["2017/07/26/common-scripts/index.html","506ff366828d759c11a79a32f7f993ec"],["2017/07/28/datascience-1-python/index.html","2f6332be46b748d39fbe87a03aa402ba"],["2017/11/18/lombok/index.html","cc9f82e2728fc97e139d6799a22dc88e"],["2017/11/19/cassandra/index.html","d0a8a04117cde15978b9dc92eacd861b"],["2017/11/19/eclipse/index.html","480579be3beefc245719fab8dffdac09"],["2017/11/19/flink/index.html","964a350b94e023377ef30165812e0383"],["2017/11/19/flume/index.html","fbf63918aac998adf6a0ff0dec09799e"],["2017/11/19/hadoop/index.html","3573bd17cedd47c393f8990bc50bdf24"],["2017/11/19/hdfs/index.html","0ae49c0543b1254fa345a281b126ddd4"],["2017/11/19/hive/index.html","f8a9e1456fc9f4a1be40ebfec6941909"],["2017/11/19/kafka/index.html","3dc2fb7a7a8f597680ffc81e80376401"],["2017/11/19/logback/index.html","f2d33a36befd5121a895a71cc955fbd9"],["2017/11/19/mycat/index.html","43b41ee68f45d0a55de3f2bc7f00d95f"],["2017/11/19/spark/index.html","746fa491ca660580bdb40812810657bb"],["2017/11/19/storm/index.html","e8e883a7ecdda20b203a16e7723e265f"],["2017/11/19/swagger/index.html","80e19bb0404797a91dffabf595cc444d"],["2017/11/29/HandlerInterceptor/index.html","0cbee6352fff62328c575793a5ead31a"],["2017/11/29/freemarker/index.html","0e630615f53dcadfc5f4a2945c690859"],["2017/11/29/hbase/index.html","e814633f27f26d7fffba4754e457f51a"],["2017/11/29/kettle/index.html","9abcefef36e9bcb1550437d46aa661a5"],["2017/11/29/shiro/index.html","9930f9e4243a7173c7575c64570b4f2a"],["2017/11/29/thymeleaf/index.html","6cfdd433e9a6d19d634e5df461767e16"],["2017/11/30/mybatisjpa/index.html","14a3d9e494e3d3c1434812ec0ada0bde"],["2017/11/30/statsd/index.html","96626fd40985ef38208a516043ac0cb1"],["2017/12/01/metrics/index.html","0a0a37f1dec1b6e1c4f832990615e428"],["2017/12/03/jms/index.html","4792fefc0aad64c576ab69f86ed328a9"],["2017/12/05/elasticsearch/index.html","192e251652fcbc4fd9c3ce583d4f7171"],["2017/12/07/grafana/index.html","dd3dc6fea8b3895f04574f4abab720a4"],["2017/12/07/graphite/index.html","e502445d369344c7e370c4798a63c1d7"],["2017/12/07/influxdb/index.html","33d8629fa16f214a50ff51c27ee1975d"],["2017/12/12/linux-bash/index.html","a997684b81a078923094f0e240b7cccf"],["2017/12/13/docker-registry/index.html","c826fd118e060822197ee0d85876f9b4"],["2017/12/14/crt/crt.jpg","aae196667058971ceb2ea9083eb5634a"],["2017/12/14/crt/index.html","a268654cb9609e9f9b0f3331934f054f"],["2017/12/17/docker-jar/index.html","f032a26b382d8c7c797417c1f6bb4bf1"],["2017/12/18/docker-base/index.html","68fb49c463c7b6c082f285d1e7f27032"],["2017/12/18/docker-bridge/e1.png","d6d9b82c9d255c3b9d732a07ee94bada"],["2017/12/18/docker-bridge/e10.png","5173773e3b9ff2fe8547ffe2e157b0d0"],["2017/12/18/docker-bridge/e3.png","bc57c342d5092e2bbb84541402e03291"],["2017/12/18/docker-bridge/e4.png","2ce807338af17a42dca0635d8102dc3c"],["2017/12/18/docker-bridge/e5.png","772de72e00fc82a4782362476ebc5d26"],["2017/12/18/docker-bridge/e6.png","0e0c62f0c820bc831df804290f3bed10"],["2017/12/18/docker-bridge/e7.png","e4e854e041a56e24b476de4a5c7242da"],["2017/12/18/docker-bridge/e8.png","eda26fa37297d548b9fd4d6f47f4406f"],["2017/12/18/docker-bridge/index.html","eebd7cc2adc0be314e6e45d9e2e76f83"],["2017/12/18/docker-resource/index.html","c976d29dc33bd789557e9247309d0ca3"],["2017/12/18/encryption-algorithm/index.html","ae8aced06bec20e45726024950ac7e5a"],["2017/12/18/openssl/index.html","f87e1ad72465804adb24ef08cf63a6b2"],["2017/12/18/telegraf/index.html","0a2963189e965660972546e0e884211c"],["2017/12/20/bat/index.html","44f0e9dc04324c928dc542a3115fe9a6"],["2017/12/20/overlay-network/index.html","ee3a2ab0a895b859fd17f84172efd58f"],["2017/12/20/qos/20110422_1184949_image001_713021_97665_0.png","e46f6538ca6b5041cfd8da0c687d3090"],["2017/12/20/qos/20110422_1184950_image002_713021_97665_0.png","91d5165771b942b03789769046af1ea6"],["2017/12/20/qos/20110422_1184951_image003_713021_97665_0.png","2bf8d8a3bcc4e8723fd1612710fbf4bc"],["2017/12/20/qos/20110422_1184952_image004_713021_97665_0.png","25574c7e2e720cdd5357d2e8beb01886"],["2017/12/20/qos/20110422_1184953_image005_713021_97665_0.png","7a3fd737f12a677d6a87256f57e59d10"],["2017/12/20/qos/20110422_1184954_image006_713021_97665_0.jpg","e18def9884cdc623b278a7678e1523dc"],["2017/12/20/qos/20110422_1184955_image007_713021_97665_0.jpg","1873447123c15a628444f42bba2f06bc"],["2017/12/20/qos/20110422_1184956_image008_713021_97665_0.png","96817bf823faea26ca654adfb95de260"],["2017/12/20/qos/20110422_1184957_image009_713021_97665_0.png","88b2c42491e83ab226d970a4cfcd1c0e"],["2017/12/20/qos/20110422_1184958_image010_713021_97665_0.png","dfcd1a9b6a5f4d5a18d26d6e6ad802aa"],["2017/12/20/qos/20110422_1184959_image011_713021_97665_0.png","ddaba393d6e2205abc567380cf8c6d4c"],["2017/12/20/qos/20110422_1184960_image012_713021_97665_0.png","b6846853e6843173a81916e99e044f9e"],["2017/12/20/qos/20110422_1184961_image013_713021_97665_0.png","52b8286b6f361d78a8c4a5a8d1456568"],["2017/12/20/qos/index.html","13bccf37fee7575176aff0597a939058"],["2017/12/21/binbash/index.html","256ac0e00ae1a4f5a033e7c711159ae4"],["2017/12/21/jenkins-for-docker/build.png","2e1afd74be6cfffa9a2738474a54c2fd"],["2017/12/21/jenkins-for-docker/git.png","5fb740985bc6b4fa2325a1007b6cb55e"],["2017/12/21/jenkins-for-docker/index.html","602384391de9b2edb9c1c3e0220cc64a"],["2017/12/21/jenkins-for-docker/poststep.png","9e9651a5cf060ec13e0e45a67a50dc1f"],["2017/12/26/activiti/index.html","992b40b638293b433c13ecda277bf5af"],["2017/12/29/apache/index.html","8e092e2f7a7ad863b6023c415538b004"],["2017/12/29/nginx/index.html","0d40d97e627953383e2280bfbedb2281"],["2018/01/04/document/index.html","5ab411f21599b0c0e9c210a8e420f28d"],["2018/01/12/classpath/index.html","a458878ebd344eafe0d702a50363b831"],["2018/01/12/typescript/index.html","e199c5c91a49460d9895e2ae50e61c9d"],["2018/01/31/elasticsearch-develop/5bcf5a16-a394-4997-aa0d-ecc6dd19940b.png","f3f29434127ca99ca09172992b01d247"],["2018/01/31/elasticsearch-develop/79cf5f34-ff75-4baf-a39a-2039b08fcb71.png","07896351aaf4c8687dc80c9d3f70a48b"],["2018/01/31/elasticsearch-develop/7a8ac7a1-2352-4db3-8b69-97c0f3ba04fd.png","2195c04ae225ad23a132329e9981db76"],["2018/01/31/elasticsearch-develop/881299781.png","ea75b2c6f69b22b7a6affa82441bd01a"],["2018/01/31/elasticsearch-develop/881459500.png","cc3284542617cf7320b01dd04eaceec2"],["2018/01/31/elasticsearch-develop/a6025996-2128-4e00-97c8-78c0aeb7622d.png","1f76d81d5425921549e4719c6658f0ff"],["2018/01/31/elasticsearch-develop/ab34c966-81c4-421a-affb-29024b8a4041.png","782067f5828a10cbdb4e4d9a6aa7ce08"],["2018/01/31/elasticsearch-develop/index.html","3e2edb7c7c614fc1064f5ab20a989f11"],["2018/02/25/maven/index.html","94d2e8b80e4f8d8cf58d40aa56008676"],["2018/02/27/encoding/index.html","3b2451e6ca28b1c6d2271719fb1af311"],["2018/05/02/spring-data-redis/index.html","6c806141c9a157f317a9b0df8548c167"],["2018/05/11/maven-plugin/index.html","12b4b510c907efb799375be3ee91c7f2"],["2018/05/11/scheduledthreadexcuter/index.html","20b949a9023ecd02306ba15427a64e33"],["2018/05/11/threadexcuter/20160221172500424.png","af254e68ad0f0f3cc25eec5ae79ce878"],["2018/05/11/threadexcuter/index.html","9d24a0a7e091864ddcf2486a120f6e06"],["2018/05/16/linux/index.html","375b26784f07f731358b89a834cb655d"],["2018/05/17/java-multi-thread/18152411-a974ea82ebc04e72bd874c3921f8bfec.jpg","90f26580297a213b4f82bf4dfe37d680"],["2018/05/17/java-multi-thread/index.html","8cf4aec2c304be745511be80cc1f5916"],["2018/05/18/java-multi-thread2/index.html","891d199c00d3ecf6ce3339591aa5c599"],["2018/05/18/tomcat-outofmem/index.html","38cd4f90cb304528a8f25897344be0ac"],["2018/05/18/tomcat-setting/index.html","3c5474ad185d6bbc2bbc7b1b9ba9acb7"],["2018/05/22/jpa-native/index.html","b2107ac240696e97658ca6534a7e6e2f"],["2018/05/23/linux-date/index.html","70c392b78c21c066bd27b6bbb2d542fc"],["2018/05/25/jpa-multi-table/index.html","9ffeadd94f022edd1bc118d6cfddf550"],["2018/05/28/need-read/index.html","506c18b7efc9036438d2ab83a05bc25d"],["2018/05/28/pom-xml/index.html","751a7e8a0edaf5c639a83f35f12f2673"],["2018/05/28/spring-xml/index.html","e8d7fe260a1892cc0de0ca1ae9677826"],["2018/05/28/tomcat-xml/index.html","40691af0d92b525cb04cfa791ff5e650"],["2018/05/28/web-xml/index.html","4bb33a99cd16716fdd9274a3bf4fca22"],["2018/06/02/activemq-linux/index.html","df8fc7f3be92907dc261c640bdb029db"],["2018/06/02/atomicboolean/index.html","8a4bdff028ee9066b3ce1cd1dc208b82"],["2018/06/02/firewall-cmd/index.html","d35dc841166b8c8e5b71b430264c4b40"],["2018/06/02/interrupt/index.html","d04240d3509f3ca2637d22c2c46e6f0b"],["2018/06/02/postconstruct/index.html","f80682841029eff5b4a36072dc99263a"],["2018/06/04/jquery/index.html","97d5e3871efe20d87bdb9a8de33949f0"],["2018/06/07/angular-directive/index.html","2ed2a9ac208d587542af32d09392352d"],["2018/06/07/eclipse-clean/index.html","a0aee11402b71a608a302629c3c38eb2"],["2018/06/14/bower/index.html","06a94dba1cf68fa3f5014290dc373047"],["2018/06/14/js-package/index.html","7aad4a3a988043925e884d4c6d090472"],["2018/06/14/npm-package/index.html","be9d0d14df112667535a25312fba304d"],["2018/06/19/ng2/index.html","fb1d731ca50158f7e3eec150d3568966"],["2018/06/28/oracle-connection/index.html","1edd5d7cbc8fa97691061d1b0bd2f261"],["2018/06/29/jpa-manytomany/index.html","0e56e6da87caf8cb246734d863905012"],["2018/07/12/angular-cli-json/index.html","07d4346a7789f2cae82a5f245026cd8e"],["2018/07/12/pwa/index.html","a563e675fdb68e8d91c2df0384c5faf5"],["2018/07/16/Date/index.html","5fae6d5a3ea1ec321393deae6d52489b"],["2018/07/18/POI/index.html","5e66732cbbeda27b6ff69e7740d1b40c"],["2018/07/20/fastjson/index.html","aa5227b836cfd58384f118e196bd7b15"],["2018/07/20/materializedview/index.html","5b4938b58251a75b513f6194159c7e53"],["2018/07/20/postman/index.html","cb4ce2aa8bdb373ffbf05f417a00418b"],["2018/07/23/PersistenceContext/index.html","66cedafb4e460334178abd9a54752394"],["2018/07/23/rxjs/index.html","7a6d559b4e7d275fe18e49c2cee71f6e"],["2018/07/23/todo/index.html","218183af9d3b278ea29c7ba76897f3f8"],["2018/07/24/echarts-rich/index.html","552edb092e13db0d296ecc030eb4bc4b"],["2018/07/24/oracle-sql/index.html","591ebba580ec0f687fbdbf0118e159c6"],["2018/07/24/sqlserver-log/index.html","a40af2cea600fb771450fbbe54752a51"],["2018/07/26/redis-cluster/index.html","be29e68057a74b89c3603e453710cd25"],["2018/07/27/docker-network/index.html","e6a60611f51d188206f714ebeb19ff1e"],["2018/07/27/test-tool/index.html","0c19b7c9bac008d2e2c8b6c9def4b649"],["2018/07/30/jconsole/index.html","b6cdc8a4addb887f32bf7c15aad8421a"],["2018/07/30/jhat/index.html","7137b0c2d08740bc4e69d18b6790562c"],["2018/07/30/jinfo/index.html","e11cfff2dc136e9876951c4b46f9d425"],["2018/07/30/jmap/index.html","90c08a789801361a1477f25adbda91c2"],["2018/07/30/jmeter/index.html","fe058cb315c647256cb337dcc09c53e8"],["2018/07/30/jps/index.html","5c95117cd15a3506acb08ba1ec74c7f0"],["2018/07/30/jstack/index.html","7f21261ece21dfbaf0c3d04c269b5c23"],["2018/07/30/jstat/index.html","f39f60091340ae106db92ea2039c4558"],["2018/07/30/jstatd/index.html","a14f7db5f90ec81b646b46d6f2d3a3f3"],["2018/07/30/jvisualvm/index.html","95624ee5a984323dd89876a0b5bfed49"],["about/index.html","80b71396c2b88ceefb5819b18e9f2263"],["archives/2017/03/index.html","a6da0f4153657024d7275b5ea982cc2d"],["archives/2017/04/index.html","852bd35f7760d9e8e53f31d1f377c07d"],["archives/2017/04/page/2/index.html","348091730b313c1b1feeadcc1e589db8"],["archives/2017/05/index.html","203e5b042a364e77cba99d6ea57e0a12"],["archives/2017/05/page/2/index.html","b4d370ea968618bcef10a06c918d02bd"],["archives/2017/06/index.html","3b05da2bef50095d724081069600d830"],["archives/2017/07/index.html","72fe995c6f2cf5b069a5393f1f4faf11"],["archives/2017/11/index.html","0d431835ed055675cdeea9b072245221"],["archives/2017/11/page/2/index.html","4db6f6f79619de531c65e81e55a69392"],["archives/2017/11/page/3/index.html","73bd91f334cb617551cb50f10304b529"],["archives/2017/12/index.html","9115f51091560aca0b6f8099958ff313"],["archives/2017/12/page/2/index.html","e7e4ba9511cd8b55d157cd281a7f713f"],["archives/2017/12/page/3/index.html","55b1485d7e413487bc5ffb0577ebc4fb"],["archives/2017/index.html","7dc4e37b7b051ac3977f8358352a2961"],["archives/2017/page/2/index.html","4c85980447fbbead1ffd57c7a17f096f"],["archives/2017/page/3/index.html","e0b186a05678a79270a68a28c9bfcdcc"],["archives/2017/page/4/index.html","125f8730a488e44869b64e4739a51611"],["archives/2017/page/5/index.html","8e7f1d29a135c2fd23df8823e5296a10"],["archives/2017/page/6/index.html","f4a54ffc9f4ca17c7679b13b1ec625e9"],["archives/2017/page/7/index.html","0944aa77c0cc15a4649261efc4b7351b"],["archives/2017/page/8/index.html","526473d17e4f1885c221eae9c6cd3572"],["archives/2017/page/9/index.html","c1423a95f4c2cc242b7dc78b101a370f"],["archives/2018/01/index.html","d928816999d25f380ce6e54320b1307d"],["archives/2018/02/index.html","56d644414fc36963e97978c3ed7e906d"],["archives/2018/05/index.html","d8403b848e96d9a593eb818f0d6d84cf"],["archives/2018/05/page/2/index.html","26e48edad5885111a7e7d85d019bfd3b"],["archives/2018/06/index.html","1f50966e747168422ce8c76ee24822a6"],["archives/2018/06/page/2/index.html","0fcd66a2444f541a4a58206f6f911f55"],["archives/2018/07/index.html","62e60db9f59d09d8341721e13806dd31"],["archives/2018/07/page/2/index.html","30f6b097fa0b1c64e26ad2ef43b90412"],["archives/2018/07/page/3/index.html","a11d989b159f786a159e6cde6567b8cd"],["archives/2018/index.html","0bc8c5a753ef0f4f58e3527884d43e5c"],["archives/2018/page/2/index.html","0c95e2a7cc4a679cc92d0167034c76f4"],["archives/2018/page/3/index.html","f4528e80855ae03854ef8d4d99d36ddd"],["archives/2018/page/4/index.html","95acea084c88b0058c83a0848b81690d"],["archives/2018/page/5/index.html","006f1729e6077382fd99186517ff32e2"],["archives/2018/page/6/index.html","8d7c98ed1df82475c2fd56dddd4833a2"],["archives/2018/page/7/index.html","c3cd56c2ffc10fc580603c0cae91bdaf"],["archives/index.html","5277dca7b87f611bd7ac06f26425e0d5"],["archives/page/10/index.html","09a29ca0e0d7bc83053f2f593875e59a"],["archives/page/11/index.html","41bd87fa10989c4c216247e051e820b6"],["archives/page/12/index.html","95b38db92ce2b523b6e9954a91d7769e"],["archives/page/13/index.html","8db2535e4e1181bf527eec869ac27684"],["archives/page/14/index.html","89a5818129f616ac19d1d2fd58802cac"],["archives/page/15/index.html","55b1436a4506f3d977ef041a477157a6"],["archives/page/16/index.html","8cccec7ba42506545dac0dc89ae76dee"],["archives/page/2/index.html","60bb90fe3944aed4707b4c9707f1e38d"],["archives/page/3/index.html","93afcc4eafd5fd28714f98429eb9caab"],["archives/page/4/index.html","eb9149f861d1ccabf207bd90bf2b6f94"],["archives/page/5/index.html","5582932ebfe65c35258b339964b24b74"],["archives/page/6/index.html","25ff3e3cdb72e3ff641f7840b135d590"],["archives/page/7/index.html","f64d52dbf1c693f8ace2a9524217963d"],["archives/page/8/index.html","94d5856dacd317bb5f333c9f004c0322"],["archives/page/9/index.html","458a87b66ea71f13cca79ad5ead48b1a"],["categories/docker/index.html","e331c1ec6121b69b05a100ae70b09751"],["categories/docker/page/2/index.html","2991da62c586837b23f6e1702013fec6"],["categories/docker/shell/index.html","2c2fb596d6cf45794f38570d7d42decc"],["categories/etl/index.html","3974c26d3bf5ee1422b978dd6c2b1825"],["categories/index.html","bb9d7d172d29e373ace00ab9aea805f8"],["categories/index/index.html","943950ecb7bf1c346bcb7bc7b8da814c"],["categories/java/index.html","61158d4f89b8a8d52c4ec0bafa0adb70"],["categories/linux/index.html","1670844daa48878646bd8f19df126b28"],["categories/shell/index.html","b40f2361915f8b180276de0b2bb54728"],["categories/springboot/index.html","3eb88dabcd81485c4c1a09541182e689"],["categories/web前端/index.html","f20b5eb3da53a660be7bf7e3150e268e"],["categories/代码管理/index.html","75332f1e703bd28d99582d70a8e6193d"],["categories/分布式/index.html","6d829abc6e03e8a6596886c5b2bc09e0"],["categories/大数据/index.html","f2b08ccbdb97bc2f0ccc61ec8514090b"],["categories/容器编排/index.html","33da9738f5615bf3149cdbe77e0f0361"],["categories/工作流/index.html","4f430c3d8949a5624fe20f5fc1353e8f"],["categories/开发工具/index.html","22cfaf0fa7b1be3a7a3390d3e3df68a0"],["categories/性能优化/index.html","c884f84f2c1dc725fa2785f326f6a460"],["categories/持续集成/index.html","f6612aad4281b39f2e40e78cf99d8027"],["categories/搜索引擎/index.html","5b3f997711bd2abfb1b10b730a114c75"],["categories/数据安全/index.html","dedb1750de968d1d9532a4643b15fbb4"],["categories/数据库/index.html","d7ff82019afb6e6ca8696744048d704f"],["categories/日志收集/index.html","6ae38adbe0fa118645da66745367e834"],["categories/服务监控/index.html","35b42afc8c71e08da410a6f83f033f9c"],["categories/机器学习/index.html","250c03d7981de62988d0ffb112541d4c"],["categories/框架/index.html","9bb08d6be097e281a6bd96aa7c82b837"],["categories/流计算/index.html","24d1b96a3ac5da596e6c2b2655c291cf"],["categories/消息队列/index.html","1c2efe544c41726e16a96f714129da0e"],["categories/第三方支付/index.html","2afa4987f9889eef5c9f636a0cbc41cb"],["categories/网络协议/index.html","532b2d91a76d217883c8bdc36e1dbbcd"],["categories/负载均衡/index.html","c0b41f829cf0d872c8dd69c54e56dc63"],["css/source.css","9cfd2fab0a69799fb775f89880f75c01"],["css/typing.css","414f6b2324a44d5ab0d4ab34f6312f50"],["css/wordcloud.css","5ca0f14978e54fbabd4434daabcabce0"],["css/wordcloud2.css","f00685cf89dfe84bace3fd1d199004ed"],["fancybox/blank.gif","325472601571f31e1bf00674c368d335"],["fancybox/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["fancybox/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["fancybox/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["fancybox/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["fancybox/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["fancybox/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["fancybox/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["fancybox/helpers/jquery.fancybox-buttons.js","f12190546a9cc3cf28c99ce3839c35ae"],["fancybox/helpers/jquery.fancybox-media.js","a43c71c37d726096a48b0d6d654dc25c"],["fancybox/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["fancybox/helpers/jquery.fancybox-thumbs.js","b3d9cb05b56033141ae6f6358df2763f"],["fancybox/jquery.fancybox.css","fd7de7df5125265bbd78984d637cf90d"],["fancybox/jquery.fancybox.js","627b3fae16845d1942d3cd4270098111"],["fancybox/jquery.fancybox.pack.js","b6d0034563763b4bb7da451d54301c9f"],["index.html","c50020ee90874e26798db4dab00004e5"],["js/jquery.min.js","b354cc9d56a1da6b0c77604d1b153850"],["js/typing.js","d5789b38a2b4ce6d87dbe5899ee62a06"],["page/10/index.html","891cfdbecb980bba8ed64a7395acd516"],["page/11/index.html","01587edc890b9a3b2d20c5d5838c5726"],["page/12/index.html","b88fc893f3aa713f0682f8ea27068176"],["page/13/index.html","aec1e77784c98b7af6b4f5d2928cd2cf"],["page/14/index.html","efd1124b90977c07b58f07a08dd02056"],["page/15/index.html","9d5528f51a1c46ee427847091af98036"],["page/16/index.html","17fdb780fbb029ac04ab873183a81e9b"],["page/2/index.html","0c268e6d90e5abaaef7e020e985bfe24"],["page/3/index.html","3b9f6febccbb5688e11356ff50b548c4"],["page/4/index.html","2cc533f198f348385ec2f757e0ade783"],["page/5/index.html","2d2f3fcb2aada7326abb6424e652de70"],["page/6/index.html","ef03c72fd852446461ba175e65882cda"],["page/7/index.html","111ad8cf0f5b451bf887958064ed895e"],["page/8/index.html","1d10290829c897178b782bfe39b05c6b"],["page/9/index.html","4d3703cf13239128c8a320120168142b"],["tags/activemq/index.html","c4a3f27af1b783c6332ca28199c51e3c"],["tags/aes/index.html","7d6b8bb4ec3b424645e7a59901c1aa16"],["tags/angular/index.html","e110c4e90c9039719d2bfa20e734436e"],["tags/angularjs/index.html","d449de43758b8e2ef174fb0b0f6338dc"],["tags/base64/index.html","d51df870a79a8a02a193635505c42544"],["tags/bat/index.html","f004df4a46920118b1737cda604750ea"],["tags/cer/index.html","f2aba55e35fa4cf25a46796908158788"],["tags/crt/index.html","468d9c6e91a723551ae7e879a82d8767"],["tags/der/index.html","52bf57a70f95b0f3b3cf53fa1aa31a05"],["tags/des/index.html","5a3966511e93b4bea61c4fae6fd1661a"],["tags/design/index.html","e6e2317bf8775c358f66d6e944879d7b"],["tags/designpattern/index.html","3ffe1e5492862aab0e5985a034ddeb28"],["tags/docker/index.html","a2dc40923d40daa31a12371a768259f9"],["tags/docker/page/2/index.html","29fca24f2e643cb5baf34824d42487dc"],["tags/dubbo/index.html","b0f7844f850582d44c69bea9f48c64ec"],["tags/elasticsearch/index.html","7d145eb3d9b45747a668b23b4ed023fe"],["tags/etl/index.html","9457b5442aa95c07a358ccea21b5949f"],["tags/freemarker/index.html","56bb024f3b21b4e258d57f00973f3138"],["tags/git/index.html","dd8eae8219c0c3dee5b907e020823090"],["tags/grafana/index.html","39062028732ba3e0580745383e82415a"],["tags/graphite/index.html","e86ddded84af1616d7c75e897bdfd7e6"],["tags/index.html","2c04e066a96b1fa687984a7ad02b119b"],["tags/influxdb/index.html","8ab0684b96d4636ed6aeac6d4c0de53d"],["tags/java/index.html","a2202e4c83555479bf6bdee63da5a8fd"],["tags/java/page/2/index.html","606339cc493ad2bdd114a2751f74ecd9"],["tags/jdk8/index.html","2597d8c7a8f8fb52507f4af10d5e675a"],["tags/jenkins/index.html","b05b319e4be1ab07d7e9ca5ee3e5a952"],["tags/jks/index.html","767c4c3d4044e32edb3c29b1a1bd2de2"],["tags/jms/index.html","3de5723547680c6a36b610bb104b210f"],["tags/jpa/index.html","aa748e4378218918236eb34e47a7949c"],["tags/kafka/index.html","e34f947d30543334526254e09aa0bc3f"],["tags/kdb/index.html","e2a23e159cfd67743f472d85fd3984e0"],["tags/key/index.html","cd3818f45684949209b80f7da0ae1d8a"],["tags/kubernetes/index.html","8832462543762fdac7d7df106e08e661"],["tags/linux/index.html","ab3768b9522095a6ff24abae3f3e06ea"],["tags/loadbalance/index.html","ca86818978c91765be6465baee43ac58"],["tags/log/index.html","b7e6c60eb5d6bb086b15a3c66be39f21"],["tags/lombok/index.html","4b554292f07cfc025bdac25c850ea9fc"],["tags/maven/index.html","651b21cedf7110ce86b5513915bda360"],["tags/md5/index.html","ba5b978ce82213af005cdd131b8bb9b3"],["tags/metrics/index.html","472c33578de94f2e05511f43acba9650"],["tags/mybatis/index.html","768bc70d0d157aa0cd771fa5807c231c"],["tags/mysql/index.html","6dd6a9daa3e87d97c6066714237b9b90"],["tags/network/index.html","b4c6f8e8fd4429f7b8f6904e3f1fba89"],["tags/openssl/index.html","973dcb740bd92114fc2364c70a365a79"],["tags/p12/index.html","7730d4b83d1e59770a29c269e4d08016"],["tags/pem/index.html","48a21a6dac7c2d71fe74ab6fa5e25fab"],["tags/pfx/index.html","cfe10e72ab1d3fa170ea7e4595dc33ba"],["tags/pub/index.html","daf93553179cbc919ebd42180be40594"],["tags/qos/index.html","41567713b9e555f760a0e8b16a8205b0"],["tags/query/index.html","5f5c469189182ce5716b7d892d9f6239"],["tags/registry/index.html","0d91fb4c60e2192ab27831224ff4882e"],["tags/rsa/index.html","244b6d2049011506e96d83d9a428cf46"],["tags/rxjs/index.html","e6a6e1da9191d27cd6d6c6e28b374910"],["tags/sercurity/index.html","aefcc2ce75c9b2b8306f8ab9b2ee2217"],["tags/sha1/index.html","95d555fa010dd7cb87c0801cf58ace20"],["tags/shiro/index.html","4f1aeb565aeaa4838d4be50b3abbd733"],["tags/springboot-dubbo-dubbo-monitor/index.html","df2ccbd1f88746f951b74ab18b2361c2"],["tags/springboot/index.html","b70c48d3a8d95060869ceb0eacc9160a"],["tags/statsd/index.html","f1cb615990aa13bd71fec00ca480d87e"],["tags/svn/index.html","c82920d60fac11098a6622af0d949c5a"],["tags/telegraf/index.html","bf919888eebac8f4f27fb669bccb1cb7"],["tags/test/index.html","42e38d66d0049bb43db7fb74b958919c"],["tags/tomcat/index.html","11d58cc780e9437bdfd8731fb54e6921"],["tags/ubuntu/index.html","77432b07cfcbb903487e73bd82092e93"],["tags/workflow/index.html","8011a92d782d17a41595b593651d74b6"],["tags/zkui/index.html","38b93212b351d26694e05edd9369653f"],["tags/zookeeper/index.html","49f842712bd44a2abd63f1029bcdb26e"],["tags/支付/index.html","63e2a25988959e3c7bb190ca7fd9af64"],["wordcloud/index.html","05c8a3eea84d7a6c6c491ed8a923c5e4"]];
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







