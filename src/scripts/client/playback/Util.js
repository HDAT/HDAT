L.Playback = L.Playback || {};

L.Playback.Util = L.Class.extend({
  statics: {

    DateStr: function(time) {
      return new Date((time - 15768000000) * 1000 ).toDateString();
    },

    TimeStr: function(time) {
      var d = new Date((time - 15768000000) * 1000 );
      var h = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();
      var tms = time / 1000;
      var dec = (tms - Math.floor(tms)).toFixed(2).slice(1);
      var mer = 'AM';
      if (h > 11) {
        h %= 12;
        mer = 'PM';
      } 
      if (h === 0) h = 12;
      if (m < 10) m = '0' + m;
      if (s < 10) s = '0' + s;
      return h + ':' + m + ':' + s + dec + ' ' + mer;
    },

    SeasonStr: function(time) {
      var d = new Date((time - 15768000000) * 1000 );
      var m = d.getMonth();
      var season = '';
      if ((m >= 12) || (m <= 2)) { season = 'Winter'; };
      if ((m >= 3) && (m <= 5)) { season = 'Spring'; };
      if ((m >= 6) && (m <= 8)) { season = 'Summer'; };
      if ((m >= 9) && (m <= 11)) { season = 'Autumn'; };
      return season;
    },

    YearStr: function(time){
      var d = new Date((time - 15768000000) * 1000 );
      var y = d.getFullYear();
      return y;
    },

    ParseGPX: function(gpx) {
      var geojson = {
        type: 'Feature',
        geometry: {
          type: 'MultiPoint',
          coordinates: []
        },
        properties: {
          time: [],
          speed: [],
          altitude: []
        },
        bbox: []
      };
      var xml = $.parseXML(gpx);
      var pts = $(xml).find('trkpt');
      for (var i=0, len=pts.length; i<len; i++) {
        var p = pts[i];
        var lat = parseFloat(p.getAttribute('lat'));
        var lng = parseFloat(p.getAttribute('lon'));
        var timeStr = $(p).find('time').text();
        var eleStr = $(p).find('ele').text();
        var t = new Date(timeStr).getTime();
        var ele = parseFloat(eleStr);

        var coords = geojson.geometry.coordinates;
        var props = geojson.properties;
        var time = props.time;
        var altitude = geojson.properties.altitude;

        coords.push([lng,lat]);
        time.push(t);
        altitude.push(ele);
      }
      return geojson;
    }
  }

});
