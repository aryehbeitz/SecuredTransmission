export default /*@ngInject*/ class utilsService {
  constructor($http) {
    this.$http = $http;
    this.data=[];
  }

  loadGoogleDirections(start, end) {
    let Start = start || '32.051102,34.761903'
    let waypoints = '32.051102,34.761903|32.061102,34.761903|32.041102,34.761903|32.051102,34.751903|32.051102,34.771903';
    // let p;
    // let s = 32.051102;
    // let e = 34.761903;
    // for (let i=0; i< 22; i++) {
      // p = this.randomPoint(32.051102, 34.761903, 300);
      // p = 32.051102 + 0.2 
      // console.log(p)
      // waypoints += '|' + s+0.0002 + ',' + e + '|' + (s-0.0002) + ',' + e + '|' + s + ',' + (e-0.0002) + '|' + s + ',' + (e+0.0002);
    // }
    const End = end || '32.050438,34.762450'
    // const Waypoints = waypoints || '32.050438,34.762450|32.054956,34.766944|32.058257,34.764830|32.056811,34.759830|32.049809,34.764143';
    const Waypoints = waypoints || 'enc:ayrbEwjesEYhBdEfA}@hFw@bDKh@uAxFq@~BqBzFi@nBYKyAa@kCGGtCaEYeF]uHa@_DKwFYuAQgEeAkCy@@M?k@Ma@s@k@{AaA}@s@NWzBkDb@jAmAtBc@t@}@s@oB}Ac@[Ps@AI_@e@uA_Ai@QgAUo@Iu@ScA{@_CsBg@SOIAQIMKEOBKHCNH^B@MZGRo@jD[bBEXMb@vD`AzGtBlAd@xD`A`Ct@tO|Er@LrG\\hCJrDNvF`@nOfAvEXhC_DXi@RUTo@r@aDjA_FlAuDVe@VE`@I`Al@z@Vf@LxBPt@HrEXlDPjBThBThIl@nJv@jAVpCjAhB`AhBnAjEfETVVTJHL\\@`@K^]f@q@`Cg@|Bw@dD}@dBWpAqCo@iFyAwCq@{C}@eOyDyDgAw@SuFg@uFa@wBQCRQbBm@hB_@bAw@zIe@tBiBG_@~JIhBWrCSnAECE?E@EGi@qBw@eDQm@?_ACk@hBP`BP^qLJuBN_EVoGD_BGaAM_AUm@o@]l@oBfAiFp@}Bv@iCTg@t@oBl@}AbA_Cv@oAjDqDtHwHPQQQ{@y@gAu@yAa@sBa@sC[yFa@QDu@Ei@EiBq@_EgBk@MXo@DU@Od@cBn@kAFKECs@k@kA_AeAk@e@MyBC{@DiGNuCDAwCOaDQcC@WHaAFo@J{@q@[eCoAkI}D}C{AaDcBcB{@?GCEoBgCkFuDiBmAGo@Ba@hDwD@Mp@_AnEmFl@y@l@kA@wAImKCkC{De@gAI{D{@qBw@Y?cA{@u@k@gCkCwEkGuA_ByBuBqCoB}BkA}B}@mHiB}Dc@gGUiIOwEUeBUcDy@}CyAuA{@aAm@qKgKiAw@sA{@w@_@oBs@eQwCaH{A}DoAcJeCaTuDeGcA}Fm@u_@aE_Ek@eAOcB[gA]mAc@_@QiAk@s\\sRs[gRwAy@{B_Au@SyCs@yBO_BCoADqOt@wGPK?y@@}GL{FAaPPqi@b@eBBq@Q{B?mAAaAGcCQcB]eBi@uAq@EGa@[wDwCgCsBeAiAa@{@e@cB]uCOyBUqJQo@NuHXsGXmCdB_OpCaVPWFU\\mBr@eD`AmDlDoIv@{Ab@aAvBkDf@y@\\u@\\cAKISQu@e@u@YsBOeEQmBEqA[oAa@[MSYk@a@EWByA~@kJnBkT`@_GLk@DCFO?QGMKGEq@LgAX_Av@oBjAwB^o@r@_@x@SpAOd@GHBRGDUIUSCaEoHa@sAIgCBqCDm@h@}Ev@sCdAsBgBeBo@oAKc@wAF_AEd@kE';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${Start}&destination=${End}&waypoints=${Waypoints}&mode=DRIVING&key=AIzaSyAWmnDKmORqE4TgOdfkaUmfnSSdziu2QXE`;
    // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${Start}&destination=${End}&mode=DRIVING&key=AIzaSyAWmnDKmORqE4TgOdfkaUmfnSSdziu2QXE`;
    // const url = `https://roads.googleapis.com/v1/snapToRoads?path=${Waypoints}&key=AIzaSyBWvdngbsIafdzoiIMO6ZGirs4zYLlGDUM`;
    console.log(url)
    return this.$http({
      method: 'GET',
      url: url
    })
    .then((response) => {
      this.data=response.data;
      return response.data;
    })
    .catch((err) => {
      this.data = err;
      console.log(err);
      return err.data;
    });
  }

  getData() {
    return this.data;
  }

  isJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);
        return o && typeof o === "object";
    }
    catch (e) { }

    return false;
  }

  randomPoint(sourceLat, sourceLng, distance) {
    let r = distance/111300; // = 300 meters
    let y0 = sourceLat;
    let x0 = sourceLng;
    let u = Math.random();
    let v = Math.random();
    let w = r * Math.sqrt(u);
    let t = 2 * Math.PI * v;
    let x = w * Math.cos(t);
    let y1 = w * Math.sin(t);
    let x1 = x / Math.cos(y0);

    let newY = y0 + y1;//lat
    let newX = x0 + x1;//lon
    console.log({lat: newY, lng: newX});
    return newY + ',' + newX;
  }
}
