<template>
  <div>
   <div id="map" class="map" @click="mapClick"></div>
   <!-- <div>
     <map-table :tableData='mapData'>
     </map-table>
   </div> -->
       <div id="eventTable">
     <Table border :columns="columnsData" :data="mapData">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">展示</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
</div>
    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer" @click="closerClick"></a>
        <div id="popup-content">
             <p>经度：{{lon}}</p>
             <p>纬度：{{lat}}</p>
            <p>备注</p>
            <Input v-model="value" type="textarea" :autosize="true" :maxlength=100 placeholder="请输入备注信息,最多可输入100字"/>
            <Button @click="submit" type="success" long>提交</Button>
        </div>
    </div>
   </div>
</template>

<script>

import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import {toStringHDMS} from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import {toLonLat} from 'ol/proj.js';
import {OSM} from 'ol/source.js';
// import mapTable from './table.vue'

export default {
  name: 'home',
  // components:{
  //    mapTable
  // },
  data(){
    return{
      zoom:11,
      center:[173059011.94070387, 3559595.9702123725],
      rotation:0,
      map:undefined,
      overlay:undefined,
      value:'',
      lon:'',
      lat:'',
      mapData:[],
      columnsData: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '经度',
                        key: 'lon'
                    },
                    {
                        title: '纬度',
                        key: 'lat'
                    },
                    {
                        title: '备注',
                        key: 'message'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ]
            }
    },
  methods: {
    mapClick:function(){
    var self = this
    this.map.on('singleclick', function(evt) {
    var coordinate = evt.coordinate;
    var hdms = toStringHDMS(toLonLat(coordinate));
    self.lon = String(hdms.slice(0,13))
    self.lat = String(hdms.slice(14,28))
    self.overlay.setPosition(coordinate)
})
},
   show (index) {
                this.$Modal.info({
                    title: '详细信息',
                    content: `经度：${this.mapData[index].lon}<br>纬度：${this.mapData[index].lat}<br>备注信息：${this.mapData[index].message}`
                })
            },
    remove (index) {
               this.mapData.splice(index, 1);
            }, 
  submit:function(){
      var onceSubmit = {
             lon:this.lon,
             lat:this.lat,
             message:this.value
      }
    this.mapData.push(onceSubmit)
     this.value = ''
      this.overlay.setPosition(undefined);
     document.getElementById('popup-closer').blur();
  },
closerClick:function(){
    this.overlay.setPosition(undefined);
     document.getElementById('popup-closer').blur();
    return false;
},
		setMap:function () {
          this.map = new Map({
          layers: [
          new TileLayer({
              source: new OSM()
             })
           ],
    target: 'map',
    view: new View({
        center: this.center,
        zoom: this.zoom,
        rotation: this.rotation,
          minZoom: 5,
          maxZoom: 15
    })
})},
   setOverlayer:function(){
      this.overlay = new Overlay({
        element: document.getElementById('popup'),
        autoPan: true,
        autoPanAnimation: {
        duration: 250
        }
     })
     this.map.addOverlay(this.overlay);
},
   mapHistory:function(){
       if (window.location.hash !== '') {
  // try to restore center, zoom-level and rotation from the URL
  var hash = window.location.hash.replace('#map=', '');
  var parts = hash.split('/');
  if (parts.length === 4) {
    this.zoom = parseInt(parts[0], 10);
    this.center = [
      parseFloat(parts[1]),
      parseFloat(parts[2])
    ];
    this.rotation = parseFloat(parts[3]);
  }
}
      var shouldUpdate = true;
      var view = this.map.getView();
      var updatePermalink = function() {
        if (!shouldUpdate) {
          // do not update the URL when the view was changed in the 'popstate' handler
          shouldUpdate = true;
          return;
        }
        var newCenter = view.getCenter();
        var hash = '#map=' +
            view.getZoom() + '/' +
            Math.round(newCenter[0] * 100) / 100 + '/' +
            Math.round(newCenter[1] * 100) / 100 + '/' +
            view.getRotation();
        var state = {
          zoom: view.getZoom(),
          center: view.getCenter(),
          rotation: view.getRotation()
        };
        window.history.pushState(state, 'map', hash);
      };
      this.map.on('moveend', updatePermalink);
      window.addEventListener('popstate', function(event) {
        if (event.state === null) {
          return;
        }
        this.map.getView().setCenter(event.state.center);
        this.map.getView().setZoom(event.state.zoom);
        this.map.getView().setRotation(event.state.rotation);
        shouldUpdate = false;
      });
  },
  // getLocation:function(){
  //   var self = this
  //   if (navigator.geolocation)
	//      {
	//     navigator.geolocation.getCurrentPosition(function (position) {
  //           console.log(1)
  //           console.log(position.coords.latitude)
  //            console.log(position.coords.longitude)
  //     })

	//    }
	//  else
	//      {
	// 	      alert('该浏览器不支持获取地理位置!')
	//    }
  // }
},
mounted:function () {
    this.setMap();
    this.setOverlayer();
    this.mapHistory()
    // this.getLocation()
}
}
// window.onload = function(){

</script>
   <style>
        html,
        body {
            height: 100%;
            width: 100%;
        }
        .map{
          height: 500px;
        }
        .ol-popup {
            position: absolute;
            background-color: white;
            -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
            filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #cccccc;
            bottom: 12px;
            left: -50px;
            min-width: 280px;
        }
        
        .ol-popup:after,
        .ol-popup:before {
            top: 100%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }
        
        .ol-popup:after {
            border-top-color: white;
            border-width: 10px;
            left: 48px;
            margin-left: -10px;
        }
        
        .ol-popup:before {
            border-top-color: #cccccc;
            border-width: 11px;
            left: 48px;
            margin-left: -11px;
        }
        
        .ol-popup-closer {
            text-decoration: none;
            position: absolute;
            top: 2px;
            right: 8px;
        }
        
        .ol-popup-closer:after {
            content: "✖";
        }
 </style>
