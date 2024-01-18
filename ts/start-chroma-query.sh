#!/bin/bash
# a85cd0a1-4414-4257-a099-f2563e5af8ac = 8a3f-findings

EMBS='[[-0.0016985071,-0.013903569,0.001615247,-0.018369818,-0.007179654,0.01863625,-0.009612604,-0.029167347,-0.006222601,-0.014639764,0.01173004,0.0071656317,0.0013803657,-0.011856246,-0.0070885066,0.01299209,0.04694821,0.0009070974,0.017079724,-0.028676549,0.0106152315,0.007214711,-0.0032112126,0.0014609966,-0.03020503,-0.014794014,0.0017396989,-0.03704814,-0.0031253232,0.0028623964,0.018846592,-0.028971028,-0.026685316,-0.02989653,-0.023375945,-0.008448714,-0.003957925,-0.0141209215,0.017907068,-0.00013080607,0.010573163,0.013223465,0.0054162918,-0.014583673,-0.00319719,-0.008602965,0.011996473,-0.028438162,-0.022268146,0.017163862,0.010909709,0.006990347,-0.012613474,-0.010299719,-0.012676577,0.0011349673,-0.008736181,0.0026029753,0.013742307,-0.014443445,-0.026362794,-0.007263791,-0.012522327,0.024175242,0.0114776315,-0.007284825,0.0056932415,0.012767726,0.008588942,0.006660812,0.023516173,0.013286567,-0.0011831706,0.011358437,0.029503893,-0.006460988,-0.0059982366,-0.012354054,-0.014597695,0.013882535,0.025773838,-0.013749318,-0.020080596,0.0029027117,0.016168244,0.008357567,0.00039285645,0.019323366,-0.00695529,0.0009850991,-0.00077651045,0.0138965575,0.0060999016,0.0072567794,-0.018776478,-0.0061594984,0.0044311928,0.034888633,-0.01964589,-0.032616947,-0.0056792186,-0.008722158,0.014906197,-0.018720388,-0.009212955,0.0049991147,-0.0021489884,-0.0012900941,0.02400697,0.0071340804,-0.034299675,0.035898272,-0.0071340804,-0.022702852,0.0072918367,0.0015056941,-0.006699375,-0.023712492,0.0012778243,-0.0011849235,0.028410116,0.0011919348,0.027484614,-0.017528454,0.012676577,0.01208061,-0.012879907,-0.029812394,-0.00095442426,0.0110429255,0.031354897,0.010068343,0.022969285,-0.0014645023,-0.02187551,0.008638022,-0.032532807,0.024189265,-0.039600283,-0.015537221,0.0028623964,0.0322804,-0.011863257,-0.006583687,-0.011596825,0.015368948,0.03239258,0.0057703666,-0.0007099023,-0.023712492,0.008553885,-0.010601209,0.011716018,0.009009625,-0.008518828,0.019940369,0.0044837785,-0.010299719,-0.015565266,-0.0019053428,0.007593326,0.012220837,0.0038387312,-0.019926345,0.004340045,0.029868484,0.00033063046,0.008736181,-0.005335661,-0.01873441,-0.012599452,0.021384712,-0.040020965,0.02716209,0.010313742,0.017654657,-0.0075162007,0.013903569,-0.009914093,-0.008778249,-0.016266404,0.01964589,0.033878993,0.028466208,-0.00009114796,-0.01811741,0.009886048,-0.009023648,0.004308494,-0.025759814,0.019659912,0.016364563,0.0046836026,-0.003456611,-0.69328535,0.009675706,0.0071481033,-0.0036459183,0.03239258,0.038001686,0.04877117,0.010909709,-0.0322804,0.003908845,0.0051288255,0.0141209215,-0.010040298,-0.0143382745,-0.0074951667,0.0062716804,0.011638893,-0.023333877,0.0005333032,0.026909681,-0.01456965,0.014513559,0.008638022,0.012704623,-0.0032778208,-0.00013562641,-0.0022699346,-0.014050808,0.0035933328,-0.010685345,-0.023992946,0.010706379,0.014296207,0.0063032317,0.034075312,-0.015775608,-0.017836954,0.0070885066,0.00009887143,0.035870228,-0.009325137,-0.007845735,0.031074442,0.018874638,0.0028869363,0.013265533,0.006432942,-0.000019034804,-0.0018685331,-0.004473261,0.0012787007,-0.0012042047,-0.012452213,0.0055670366,-0.0045609036,-0.0119263595,0.01370725,-0.01055914,-0.0006818568,0.00527957,-0.008098145,-0.0011787885,-0.008448714,-0.008687101,-0.04142324,0.017724771,-0.017472362,0.025815906,0.0042313687,-0.0049325065,-0.003761606,-0.0031323347,-0.016378587,-0.01051006,0.017738795,0.031186623,0.02187551,-0.007705508,-0.0033251476,0.0052900873,-0.00085013,0.0004566162,-0.008694112,0.0061489814,0.031607307,-0.0048343474,-0.0074601094,-0.0073829843,0.015929857,0.014282184,0.025591541,0.017262021,0.003999993,-0.0035319834,0.015985949,0.004350562,0.0013339153,0.005847492,0.025016608,-0.011407517,0.00071735197,-0.0005337414,0.0011481136,-0.0046205004,-0.0069062104,0.012108656,0.006664318,0.028858844,0.024932472,-0.008939511,-0.018916706,-0.015242742,-0.0060227765,-0.009030659,0.0005582812,-0.040020965,0.0064399536,0.014597695,0.0144154,-0.019281298,0.013412773,0.007845735,0.02015071,0.002219102,-0.0020368062,0.009149852,-0.012914964,-0.017037656,-0.016897429,-0.020795757,0.006120936,-0.013728284,0.010159492,-0.03146708,0.009325137,-0.0043786075,0.025142813,-0.021847464,0.013335647,-0.026166474,-0.0038282142,-0.00360385,0.009402262,0.012480259,0.011351426,-0.020739665,-0.019505663,-0.013517943,-0.011428552,0.02061346,-0.01792109,-0.004918484,-0.022815034,-0.0024154207,-0.0026643248,-0.030036757,-0.0020508291,-0.022296192,-0.018664297,-0.008939511,-0.0011726535,0.027190136,-0.014878151,0.0011034161,-0.0074951667,0.00095442426,-0.020935984,0.013272544,-0.0036739637,-0.025086721,-0.009942139,-0.0030166467,-0.0040525785,0.024133174,0.0040175216,0.008182282,0.0007116552,-0.008196305,0.003954419,-0.02243642,0.008539862,0.011589813,-0.0033409232,0.0067694886,0.023712492,0.017472362,0.010629254,0.010313742,-0.010467992,0.008595954,-0.016013995,-0.008785261,-0.008280441,0.0058615147,-0.0017545981,0.011975439,0.006867648,0.00158019,0.008077111,0.008399635,0.02437156,-0.0074741323,-0.005097274,-0.0012883412,0.02116035,-0.022829058,0.009619615,-0.014611718,0.00702891,0.019351412,0.009367205,-0.043021835,-0.027933342,-0.006425931,0.025942111,0.021174371,-0.0039018337,0.0003133211,-0.008077111,0.0067309258,0.010552129,-0.009318125,-0.0037791345,-0.010657299,-0.0035179604,0.0035372418,0.014401377,0.041142784,0.02183344,-0.030064803,-0.018285682,0.016897429,0.010390867,-0.00023685322,0.020669552,0.010776493,0.010068343,-0.024722131,0.03903937,0.019225208,0.012830827,0.011631882,0.033318084,-0.003083255,0.019449571,0.0022401363,0.032056034,-0.00019149834,-0.009893059,0.007873781,-0.0021595054,0.010453969,0.0008943893,-0.013482886,0.033514403,-0.010951778,-0.011162119,0.018089363,0.021440804,0.047985893,0.017177884,0.009577547,-0.0006310243,-0.0014829071,0.008231361,-0.005994731,0.010026275,-0.001495177,0.0045188353,-0.028592413,-0.010201559,-0.015621358,0.00994915,-0.007446087,0.018860616,0.012767726,0.0062366235,-0.004375102,0.023235718,-0.0112602785,-0.0033076191,-0.03300958,0.021903556,0.0021209428,0.00761436,-0.020220824,-0.03421554,0.0031761557,-0.0030043768,-0.00024956136,-0.017430294,-0.022857103,0.019589799,-0.019814163,0.013931614,0.022478487,0.004879921,0.0015942128,0.00026533694,-0.0034636224,0.0059561683,-0.0022261136,-0.0061910497,-0.02299733,0.008252395,-0.008140214,-0.023109512,-0.021146325,0.014134944,-0.0022138436,0.013749318,-0.010047309,-0.017163862,0.001279577,0.0061700153,0.009226978,-0.019926345,0.0021139313,0.02259067,0.011113039,-0.02726025,-0.020992076,-0.022057805,0.001569673,0.027863229,0.028942982,0.015859744,0.020417143,-0.009759842,-0.011596825,-0.023670424,-0.020290937,0.010040298,-0.010804539,0.005577554,-0.0029675672,0.008567908,-0.017444316,0.0066923634,0.024750175,-0.0015565266,-0.008631011,0.013840467,0.006243635,-0.0117090065,0.005055206,0.013468863,0.015354925,0.008287452,-0.00064636173,0.0017493396,0.01710777,0.010643276,-0.013840467,-0.007971941,0.015593312,-0.0088553745,0.017276043,0.0012304974,0.026531067,-0.0034601167,0.01101488,0.00994915,-0.010467992,0.025311086,0.0009316373,0.00034246215,-0.00071384624,-0.0017879022,-0.000974582,0.017738795,0.012227849,-0.0024171737,-0.024904426,0.009577547,0.010657299,-0.020767711,-0.015481129,-0.00071384624,0.03051353,-0.015929857,-0.0082173385,-0.017836954,-0.008736181,-0.02528304,-0.04142324,0.00040775564,-0.010601209,-0.014064831,-0.036122635,-0.023277786,-0.01273968,-0.027049908,-0.01639261,-0.006874659,-0.02400697,-0.012620486,-0.0145556275,0.024175242,0.007049944,0.021328622,0.021903556,0.0030359281,0.01629445,-0.012879907,0.00051665114,-0.011716018,-0.013784375,0.0058545033,0.011589813,0.0035284776,0.00087247876,0.00030061297,-0.006446965,0.010776493,0.008623999,-0.0036634468,-0.02319365,0.010923732,0.004690614,0.0022786988,0.012515316,-0.014948265,-0.0067694886,0.0017212941,-0.017121794,0.0038913165,0.0039859703,0.005020149,0.008602965,-0.020515302,0.027751047,-0.024035014,-0.003230494,0.031551216,-0.0123750875,0.0134478295,-0.0053426726,0.0090727275,0.0013347917,-0.0014496031,0.022548603,-0.007943895,-0.011603836,-0.0014434682,-0.03138294,0.028101616,0.007880793,-0.01030673,0.0019999966,-0.018804524,-0.011814177,-0.00025219063,0.0070744837,-0.023852719,0.021749305,-0.0144154,-0.006688858,-0.039600283,-0.029363664,-0.02761082,0.00827343,0.0075021777,0.005079746,-0.02437156,0.010524083,0.0070744837,-0.035982408,0.0006108666,-0.03648723,-0.012059576,0.010096389,-0.008399635,0.01852407,0.0056266333,-0.013510931,-0.031971898,-0.0097458195,-0.0123610655,-0.04204024,0.011386483,-0.019870255,0.024049038,0.008960545,0.032869354,-0.004269931,0.011842223,0.008974568,0.0014794015,-0.0027922825,-0.020950006,0.002333037,-0.013293579,0.028087594,0.025970155,-0.0021893037,0.0090727275,0.007481144,-0.0006840479,0.017724771,-0.009332148,-0.0065311017,-0.008869397,-0.006054328,0.0029991183,0.0019316355,-0.0039964872,0.017780863,-0.01466781,-0.019968413,0.030233076,-0.0010569657,0.0005451349,-0.0061489814,0.010741436,-0.016869383,-0.004438204,0.009563524,-0.0071481033,0.011680961,-0.017472362,-0.033935085,-0.0021402242,0.014134944,-0.0018159477,0.018552115,-0.0072988477,0.014064831,-0.010411901,0.019716004,-0.035393454,-0.014127933,-0.0048974496,-0.016378587,-0.0054338207,-0.0051954333,0.021651145,-0.010545118,0.018720388,0.011302346,-0.027694955,0.004893944,-0.013665182,-0.016981564,-0.0065170787,-0.009626626,0.0291393,0.022254124,0.01954773,0.032813266,-0.001766868,-0.032981537,-0.02055737,-0.00791585,-0.019379457,0.032616947,0.019533709,-0.007810679,-0.004297977,0.01776684,0.023978924,-0.005156871,-0.01137246,-0.0035722987,0.020585416,0.0018667802,-0.021552986,-0.0024171737,-0.04633121,0.019996459,0.0009325137,-0.010068343,-0.017949136,-0.0021559997,-0.00040271622,0.008497794,-0.029447801,0.016574904,0.019028889,-0.031074442,0.0057808836,-0.0010482015,-0.020781733,0.0034829036,-0.007943895,0.036935955,-0.016729156,0.004893944,0.028690573,-0.0022927218,-0.01670111,0.00147239,-0.01563538,0.030429395,-0.032364536,0.004992103,-0.0034601167,0.012318997,0.005980708,0.015368948,-0.024343515,-0.017794885,-0.010699368,-0.00065950805,0.022464465,0.008960545,0.0067940284,-0.011758086,-0.010467992,-0.004613489,-0.01731811,-0.032813266,0.0031884257,-0.0007405771,-0.031607307,0.0025556486,0.0018036778,0.0013269039,0.0021472354,-0.018860616,0.0057388158,0.012830827,-0.036992047,0.0114916535,-0.0074390755,0.002299733,-0.011666939,0.005146354,-0.015621358,-0.014962288,0.019197162,-0.033514403,-0.020543346,-0.025002586,-0.012851862,0.017640635,0.007873781,-0.008967557,0.0031375932,-0.0123610655,-0.0018615217,0.0039053394,-0.013658171,0.006040305,-0.015004355,0.009696741,-0.004070107,-0.014527582,0.010657299,0.009002614,0.01691145,0.006720409,-0.017935114,-0.00527957,-0.005665196,0.010748448,-0.0050271605,-0.010124435,-0.02933562,-0.0028641492,0.0033286533,0.01569147,0.0009921105,-0.011786132,-0.0033917557,-0.012999101,0.00041695806,0.018888662,-0.01325151,0.0030411866,-0.0288308,-0.0006270804,-0.015172629,-0.011694984,0.0042909654,0.026404861,0.0052865813,-0.02218401,-0.026629226,0.007670451,-0.05923215,-0.021454826,-0.0026082338,0.019519685,0.015565266,0.0019018372,-0.01720593,0.021356666,0.016630996,0.030345257,-0.0144154,-0.012094633,0.01365116,-0.020178756,0.01112005,-0.009766854,-0.037160322,-0.0060367994,0.019617844,0.027176114,0.0136721935,0.007957918,-0.0054408317,-0.010734425,-0.00014515751,0.011666939,0.009998229,-0.026418885,-0.008939511,-0.0090797385,-0.01121821,0.0123610655,-0.0069587957,-0.013931614,-0.022604693,-0.0024206794,-0.009717775,0.012424167,-0.042460926,0.000651182,-0.011561767,-0.022464465,0.01137246,0.008077111,0.010418912,0.031186623,0.010867641,-0.014036785,-0.0123680765,0.006331277,-0.019800141,-0.006534607,-0.004066601,-0.0110499365,-0.022127919,-0.012865884,0.0066432836,-0.010874652,0.0024066565,-0.018243615,-0.0056476677,0.0053987633,0.019197162,0.017528454,-0.026643248,0.00000177681,-0.020585416,-0.011035914,0.0074040187,-0.012059576,0.011694984,-0.005893066,0.009921105,0.009970184,-0.0026205038,-0.01304818,-0.027652888,0.012073599,-0.01081155,0.013370704,0.20147905,0.00014986827,-0.006636272,0.024357539,0.007922861,0.00002332106,0.009682718,0.01264152,0.0013277803,0.021721259,0.025605565,0.007151609,0.004224357,0.011028903,0.0036494238,0.017037656,-0.023418013,-0.027526682,0.0016362811,-0.020879893,0.014191035,-0.024623971,-0.0010271673,0.0003946093,0.047424983,0.0048729097,-0.0093041025,0.0011034161,0.028914936,-0.012957033,-0.02989653,-0.0012909706,0.0022594177,-0.0036178727,-0.020739665,-0.008511817,-0.0007887804,0.019701982,0.01700961,-0.012403133,0.0074530984,-0.0059141,0.013784375,-0.015396994,0.00039044628,0.01623836,0.0048904386,-0.013665182,0.001121821,0.013784375,-0.04117083,-0.0051498595,0.012774737,0.014695855,0.02055737,0.0067800055,0.04375102,-0.01751443,-0.006772994,0.015551244,-0.024189265,0.013840467,-0.03219626,0.021034144,-0.026965773,0.007705508,-0.015551244,-0.001971951,0.012865884,0.002730933,0.00609289,-0.024820289,-0.00007312652,-0.00068317144,-0.021581031,-0.016378587,0.025409246,0.019084979,0.02294124,0.0037230435,-0.0025188387,-0.005219973,0.008399635,-0.016785247,-0.0030885134,-0.0288308,0.0045714206,0.0041156807,-0.009843979,0.0061454754,-0.023123534,-0.021034144,-0.025325108,-0.031971898,0.0054829,0.036627457,-0.0022909688,0.019056935,0.004564409,-0.007537235,-0.013665182,0.010159492,0.03477645,0.017710749,-0.0032637978,0.028592413,-0.020375073,-0.0019106014,-0.009226978,-0.00525503,-0.013265533,-0.037973642,0.010278685,-0.007838724,-0.0027817655,-0.0017432047,-0.001801925,-0.011821189,0.0013567023,-0.005055206,0.01964589,-0.002163011,-0.004704637,0.009619615,0.0018106892,0.002173528,-0.016588928,-0.010853618,0.022450443,-0.024119152,-0.001648551,-0.01426115,0.014653787,-0.0056792186,-0.013623114,-0.00159246,-0.0036318954,-0.0003177032,-0.02807357,0.00048860564,0.018271659,-0.022492511,-0.020529324,0.0070955176,0.0013812421,-0.019379457,0.037945595,-0.011246256,-0.011940382,-0.0067800055,-0.016967542,-0.022296192,-0.015256765,-0.0011305852,0.024960518,-0.0045854435,-0.028564367,-0.03690791,0.0121437125,-0.008652044,-0.028999073,-0.005472383,0.045658115,-0.0053391666,-0.01284485,-0.010552129,-0.1855492,0.019267276,0.02024887,-0.01731811,0.008245384,-0.003027164,0.027400479,-0.01609813,-0.009479388,0.0034548582,0.01933739,0.006019271,-0.023291808,-0.0045048124,-0.0027379445,-0.0009833463,-0.0071235634,-0.008967557,0.015144584,0.02838207,0.025451314,-0.024020992,0.0051638824,-0.012858873,0.0030639735,0.0007966682,-0.006787017,0.025745792,0.018215569,-0.0040841294,-0.01731811,-0.0018229592,0.020795757,-0.008581931,0.0034373295,-0.0021384712,0.014583673,-0.017850976,-0.0010464486,0.007319882,-0.0032199768,0.034888633,-0.006496045,-0.007354939,-0.0024995573,0.010503049,0.008238373,0.016168244,0.024904426,-0.027077954,0.006205072,-0.007537235,0.014878151,-0.02278699,0.022730898,0.0031551216,-0.024525812,0.00046844792,0.018467978,0.009107784,-0.0048694042,-0.041339103,0.019197162,0.004680097,-0.022815034,-0.013553,-0.018341774,-0.0049254955,-0.023712492,0.008764227,0.0013339153,-0.010783505,0.040750146,-0.018131431,0.019631868,0.0014425917,-0.022113897,0.0044276873,-0.0060367994,0.0033233948,-0.011835212,0.043975383,0.009135829,0.018411888,0.007838724,0.010790516,-0.0011893056,0.011162119,0.0023628355,-0.013994717,0.033318084,0.00081025274,-0.007284825,-0.009865013,0.01569147,0.010748448,-0.0022278663,0.010923732,0.006762477,-0.007544246,-0.007572292,-0.0015486388,-0.022983307,0.01761259,0.014191035,-0.0062506464,0.014275172,0.036767684,0.016013995,-0.0027519672,-0.0328974,-0.011176142,0.023165604,0.010327765,0.016883407,0.027807139,0.005055206,-0.02939171,-0.0028992062,-0.012999101,0.030233076,-0.003957925,-0.0071481033,0.016322495,0.009114795,-0.01157579,-0.10348798,-0.053062133,0.01365116,0.0582786,-0.0075652804,0.028283913,0.017794885,0.026545089,-0.006120936,0.026306702,-0.03014894,-0.015901813,-0.016855361,-0.012704623,-0.0114846425,0.007684474,0.0069868416,-0.009872025,-0.0057423213,0.0432462,-0.01573354,-0.006762477,0.005321638,-0.030373303,-0.0046064775,-0.00786677,-0.03584218,0.037581004,0.017402248,-0.0079929745,0.0010315494,-0.020823803,0.018005228,-0.043274246,-0.009858002,-0.00403505,-0.019617844,-0.02096403,0.052360997,-0.0072778137,0.023039399,0.01319542,0.0020648518,-0.016476747,0.019379457,-0.027316341,0.0019684453,0.0066152383,-0.014737924,-0.02817173,-0.021693213,0.006853625,0.0072988477,-0.014247127,0.0052164677,0.008736181,0.021917578,0.031186623,-0.016687088,0.000101117264,-0.0045959605,-0.0012453966,0.011631882,0.021987692,-0.010320753,-0.00049035845,-0.030429395,-0.00659771,0.0072077,-0.01578963,0.010117423,0.011912337,-0.005924617,0.029672164,-0.025970155,0.026012225,-0.03853455,-0.010096389,0.03183167,-0.016869383,-0.012227849,-0.0014320746,0.009037671,-0.025970155,0.031691443,-0.0068360968,-0.014268161,-0.00019960526,0.0021963152,-0.020907938,-0.0020683575,0.026937727,0.029251482,-0.022254124,-0.040694058,0.019982437,-0.009942139,-0.0060367994,0.008904454,0.005791401,-0.014015751,-0.036543317,-0.06371943,0.018033272,-0.0058860546,0.004080624,0.008673078,0.025395222,-0.007831713,-0.008287452,-0.00082164624,0.017163862,-0.014254138,0.01923923,-0.0008203316,-0.010650288,-0.0084276805,-0.0067765,0.021819418,0.025297064,0.01522872,0.018411888,0.0036213784,-0.013328636,0.013076226,0.00079053326,-0.011589813,0.0018299705,-0.008911465,0.012599452,-0.007242757,-0.013973683,0.0074250526,-0.020950006,-0.0051638824,0.015368948,-0.009241001,-0.0023418013,-0.017065702,0.014429422,0.016056063,0.0027151573,-0.011884291,-0.020501278,0.0068606366,-0.03463622,-0.019014865,0.010622242,-0.020318983,0.018061318,0.012269917,-0.00781769,0.008497794,0.011744063,-0.016616974,-0.017121794,-0.0064189197,-0.023418013,-0.0027607314,-0.0029728257,0.0025328614,-0.007014887,0.023375945,0.015985949,0.041703697,0.013531966,0.013917591,0.00423838,-0.014043797,-0.0052760644,0.013700239,-0.010257651,-0.014653787,-0.010566152,0.027288295,0.0011533722,0.018580161,-0.0028957005,-0.005055206,0.0036213784,0.02218401,0.019491639,-0.0021332128,0.020823803,-0.0444802,0.017879022,0.018706365,0.014401377,-0.010727413,-0.0054934174,-0.005006126,-0.0028220809,-0.020823803,0.0035477588,-0.0019386469,0.0018264648,-0.004361079,0.011127062,-0.005868526,-0.007284825,0.024609948,0.014597695,0.011232233,0.0068396023,0.0062962202,0.0016397868,0.013167374,-0.008287452,-0.023880765,-0.03783341,-0.002888689,0.021258509,0.0073128706,0.0023856224,0.006660812,0.008392624,-0.0076774624,0.013118294,-0.020473232,0.0017475868,-0.021595053,0.016308473,-0.0010999105,0.019730026,0.030289168,0.0020911444,0.013496909,-0.0072077,0.010881663,-0.014106899,-0.00086546736,0.016673064,0.014401377,-0.0025328614,-0.026727386,-0.026362794,-0.019659912,0.0016222583,0.00066257553,0.008616988,-0.022674806,0.061307516,0.032981537,-0.01167395,0.010341788,0.0114916535,0.008294464,0.012452213,0.024020992,-0.0018317234,-0.007670451,0.019926345,0.0076073487,0.01035581,-0.0055249683,-0.019169116,0.016729156,-0.0030727377,0.010390867,0.003128829,0.0065906984,0.010159492,-0.004680097,0.025184881,0.0046695797,-0.015214697,-0.01741627,0.030878123,-0.0088553745,-0.008602965,-0.010159492,0.01695352,0.005244513,-0.02811564,-0.0325889,0.018608205,-0.0138965575,0.004399642,-0.016364563,-0.0036073555,0.00017473676,0.015915835,0.028858844,-0.04750912,-0.026909681,0.007544246,0.00340052,-0.012164746,-0.010208571,-0.000084300904]]'

READ_JSON_TEMPLATE='{
  "where": {},
  "where_document": {},
  "query_embeddings": %s,
  "n_results": 10,
  "include": [
    "metadatas",
    "documents",
    "distances"
  ]
}'

# Replace placeholder with the actual embeddings
READ_JSON=$(printf "$READ_JSON_TEMPLATE" "$EMBS")

echo $READ_JSON

echo "starting query"
curl -X 'POST' \
  'http://localhost:8000/api/v1/collections/a85cd0a1-4414-4257-a099-f2563e5af8ac/query' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Chroma-Token: LydWGLiQnQuEZutgjW4r' \
  -d "$READ_JSON"