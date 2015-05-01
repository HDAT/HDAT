'use strict';

var southWest   = L.latLng(-70, 179),
    northEast   = L.latLng(70, -179),
    bounds      = L.latLngBounds(southWest, northEast);

var satellite   = L.tileLayer('https://{s}.tiles.mapbox.com/v4/erva.33c59435/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXJ2YSIsImEiOiJUNy1GUV84In0.YTqElwgLmBOW8higJ-9GIw', {id: 'satellite'}),
    geography   = L.tileLayer('images/tilesoverlay/{z}/{x}/{y}.png', {id: 'geography'});

/* Basiskaart */
var baseMaps = {
    "Satellite": satellite,
};

/* Optionele kaart, hier moet later routing network in */
var overlayMaps = {
    "Geography": geography
};
  
var map = new L.Map('map', {
  zoomControl:          true,
  center:               [10, 35],
  minZoom:              3,
  maxZoom:              5,
  zoom:                 3,
  noWrap:               false,
  maxBounds:            bounds,
  attributionControl:   false,
  inertia:              true,
  worldCopyJump:        true,
  layers:               [satellite]
});

L.control.layers(baseMaps, overlayMaps).addTo(map);

L.Icon.Default.imagePath = 'images/leaflet/';

var data =  
  {"type":"Feature","geometry":{"type":"MultiPoint","coordinates":[[97.9478583453995,5.88558991456485],[99.9836780977949,3.91839329989059],[101.101663383169,2.76895574306058],[101.890829466963,2.19709626205062],[102.519874896074,1.73960867724266],[103.41197568645,1.28212109243469],[103.560659151512,0.881819455727719],[104.026724628535,-0.015999929457914],[104.324091558661,-0.725105685910262],[104.552835351065,-1.33127673578082],[104.667207247267,-1.76588994134839],[105.044634504733,-2.22337752615635],[105.44493614144,-2.30343785349775],[105.788051830046,-2.64655354210372],[106.108293139412,-3.04685517881069],[106.096855949791,-3.36709648817627],[105.936735295109,-4.16769976159021],[105.982484053589,-4.64234313082847],[105.882408644413,-5.84324804094939],[104.44931219835,-6.53499835898156],[101.571264096452,-9.18950874422689],[97.9946606300163,-11.4528281253308],[91.8194312074982,-15.0434026990574],[85.1831552443849,-17.6979130843027],[74.5930559179851,-21.5679098038445],[62.6058458625089,-25.6335020254571],[50.0178781935298,-28.7211167367161],[36.7875658603713,-31.6536783059658],[36.340164155871,-31.7528470188121],[28.6281129313688,-34.4632418332205],[20.594726239179,-35.1617971977587],[18.7225978622165,-34.7426639790358],[18.2270983014336,-34.186031355559],[18.3091729524126,-33.9150118060562],[18.4249830635265,-33.9015193872029],[14.5444648908899,-30.6482613643079],[9.72012907515562,-26.5478140421487],[2.70507808149652,-20.4900103327567],[-2.42405288942735,-16.1228672498067],[-10.6630469281444,-9.17925262064511],[-19.1163500603541,-0.768811307133922],[-20.919221122431,0.873150917348737],[-18.4125455990101,4.78894629715591],[-21.2520487304137,12.446445064425],[-21.3986037307442,17.5245758258771],[-19.4823971014228,25.0648305928818],[-18.2366795986135,31.1322076065649],[-17.1375170961347,34.7447883647119],[-15.510756592466,38.8483283739662],[-13.6385164632438,43.0691123834848],[-10.6817693315758,46.4618606411361],[-7.74334157494906,48.5575971458624],[-4.59240906784311,49.7593481485726]]},"properties":{"time":[8983180800, 8983406545.4789, 8983534517.05008, 8983612402.45203, 8983674576.32318, 8983754798.25955, 8983788822.22218, 8983869472.62923, 8983930751.72314, 8983982375.38293, 8984018169.55232, 8984065504.66367, 8984098191.47773, 8984136935.68574, 8984177836.85401, 8984203349.60328, 8984268364.86229, 8984306331.54932, 8984402280.86938, 8984529066.69844, 8984840340.57366, 8985175054.66805, 8985735311.90728, 8986287789.37322, 8987144649.28778, 8988082785.16855, 8989013565.07628, 8989959637.3032, 8989991183.52935, 8990552631.68071, 8991084632.07914, 8991212222.02942, 8991267457.5994, 8991289779.5971, 8991297566.13267, 8991667302.56705, 8992138883.65283, 8992845267.563, 8993368189.24033, 8994217049.67629, 8995167423.81521, 8995362275.58958, 8995733011.34838, 8996382933.75855, 8996787654.34823, 8997405540.29542, 8997897610.43269, 8998195412.76138, 8998539532.61309, 8998895561.86671, 8999215028.32904, 8999446390.30429, 8999637787.7362]}}
;

var customIcon = L.icon({
    iconUrl:                'images/leaflet/customIcon.png',
    className:              'customIcon',
    iconSize:               [40, 40], // size of the icon
    iconAnchor:             [20, 20], // icon center point
    popupAnchor:            [70, 70] // point from which the popup should open relative to the iconAnchor
});

var playbackOptions = {
    playControl:            true,
    dateControl:            true,
    sliderControl:          true,
    tickLen:                4000,
    maxInterpolationTime:   46464646464646,
    marker:                 function(){
                                return { icon: customIcon }      
                            }     
};
        


// Slider shit

var slider = document.querySelector('.slider').addEventListener('input', function(e){
  console.log(e.target.value);
  if (e.target.value == 1755){
    var playback = new L.Playback(map, data, null, playbackOptions);
    console.log('1755');
  }
});


/*

var HDAT.initialise = function(){

  this.compareVoyages = function(activeVoyages, newVoyages){
  
  };

  this.getActiveVoyages = function(){
  
  };

  this.getVoyages = function(){
  
  };

  this.onChangeCallBack = function(){
    var toBeAppendedVoyages = this.getVoyages();    
  }

  this.getStartTime = function(voyages){
    start = somecalucaltion(voyages);
    return start;
  };

  this.getEndTime = function(voyages){
    end = somecalculation(voyages);
    return end;
  };

  this.appendSlider = function(start, end, onChangeCallBack){
    L.layer.append(input, range, min, max).on('input', onchangeCallback)
  };

  this.initialiseInterface = function(){
    start = this.getStarttime();
    end = this.getEndtime();
    appendSlider(start, end, this.onchangeCallback)
  };

  this.getData = function(){
    // ajax asynchronous.

  };

  this.initialiseApp = function(){
    this.getData(initialiseInterface);
  };

  this.initialiseApp();

}

var HDAT-1 = new HDAT();

*/







