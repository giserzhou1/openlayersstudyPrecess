<template>
  <div id = 'all'>
   <div id="map" class="map" @click="mapClick">
   </div>
<div class="nav">
  <iframe id='weather' scrolling="no" src="https://tianqiapi.com/api.php?style=tr&skin=pitaya" frameborder="0" width="325" height="220" allowtransparency="true"></iframe>  
  <Button id = 'tableMode' @click = 'tableMode()' type="success">显示统计表格</Button>
</div>
 <div v-show='mode' id="eventTable">
     <Table border :columns="columnsData" :data="mapData" size = 'small' height="200">
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
<!-- <Button @click="changeZoom" type="success" long>提交</Button> -->
   </div>
</template>

<script>

import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
// import {toStringHDMS} from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
// import {toLonLat} from 'ol/proj.js';
import {OSM} from 'ol/source.js';
import axios from 'axios'
import citys from './citys'


// import BingMaps from 'ol/source/BingMaps.js';
// import mapTable from './table.vue'

export default {
  name: 'home',
  // components:{
  //    mapTable
  // },
  data(){
    return{
      zoom:9,
      center:[117.96241,40.954071],
      rotation:0,
      map:undefined,
      overlay:undefined,
      value:'',
      lon:'',
      lat:'',
      mapData:[],
      cityweatherData:[],
      mode:false,
      // weatherData:[],
      // currentIndex:0,
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
    getArray(){
     for(let i = 0;i < 345;i++){
          this.cityweatherData[i] = []
       }
    },
    tableMode(){
       let tableButton = document.getElementById('tableMode')
       let buttonText = document.getElementById('tableMode').innerText
       if(buttonText === '显示统计表格'){
         tableButton.innerHTML = '隐藏统计表格'
         this.mode = true
       }
       else{
          tableButton.innerHTML = '显示统计表格'
          this.mode = false
       }
    },
  //   getWeather(city){
  //     let self = this
  //      axios(
  //        {
  //           method:'get',
  //           url:'https://www.tianqiapi.com/api/',
  //           params: {
  //             appid:'44674489',
  //             appsecret:'snkY8YZ4',
  //             version:'v6',
  //             city:city            
  //        }
  //        }
  //      ).then(function (response) {
  //          console.log(response);
  //         // self.cityweatherData.push([response['data']['tem'],response['data']['wea'],response['data']['wea_img']])
  //      })
  //      .catch(function (error) {
  //         console.log(error);
  //     })
  //   },
  //  getAngle(city,i){
  //      let self = this
  //      axios(
  //        {
  //           method:'get',
  //           url:'https://restapi.amap.com/v3/geocode/geo?parameters',
  //           params: {
  //             key:'32a3b0d6a48ac4b2265f389aa2b54ebe',
  //             address: city, 
  //             city: city, 
  //             // dataType:'JSONP',
  //             output:'json'      
  //        }
  //        }
  //      ).then(function (response) {
  //         // console.log(response)
  //         //  console.log(response['data']['geocodes']['0']['location'])
  //         self.cityweatherData[i].push(city)
  //         self.cityweatherData[i].push(response['data']['geocodes']['0']['location'])
  //      })
  //      .catch(function (error) {
  //         console.log(error);
  //     })
  //   },
    
   async getWeatherData(){
      let self = this
       for(let i=0;i<10;i++){
         await axios(
         {
            method:'get',
            url:'https://www.tianqiapi.com/api/',
            params: {
              appid:'44674489',
              appsecret:'snkY8YZ4',
              version:'v6',
              city:citys[i]       
         }
         }
       ).then(function (response) {
          //  console.log(response);
        // self.cityweatherData[i] = []
        // self.cityweatherData[i].push(citys[i] )
        self.cityweatherData[i].push(response['data']['tem'])
        self.cityweatherData[i].push(response['data']['wea'])
        self.cityweatherData[i].push(response['data']['wea_img'])

        // self.cityweatherData[i].push(response['data']['HeWeather6']['0']['now']['tmp'])
       })
       .catch(function (error) {
          console.log(error);
      })
      await axios(
         {
            method:'get',
            url:'https://restapi.amap.com/v3/geocode/geo?parameters',
            params: {
              key:'32a3b0d6a48ac4b2265f389aa2b54ebe',
              address: citys[i], 
              city: citys[i], 
              // dataType:'JSONP',
              output:'json'      
         }
         }
       ).then(function (response) {
          // console.log(response)
          //  console.log(response['data']['geocodes']['0']['location'])
           self.cityweatherData[i].push(citys[i])
          self.cityweatherData[i].push(response['data']['geocodes']['0']['location'])
       })
       .catch(function (error) {
          console.log(error);
      })
     
          //  this.getWeather(citys[i])
          //  this.getAngle(citys[i],i);
          // console.log(i)
      // console.log(this.cityweatherData)  
       }       
        await this.addPics()
    },
    mapClick:function(){
    var self = this
    this.map.on('singleclick', function(evt) {
    var coordinate = evt.coordinate;
    // console.log(coordinate)
    self.lon = String(coordinate[0].toFixed(4))
    self.lat = String(coordinate[1].toFixed(4))
    self.overlay.setPosition(coordinate)
    // self.overlay2.setPosition(coordinate)
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
                     })],
    target: 'map',
    view: new View({
        center: this.center,
        zoom: this.zoom,
        projection: 'EPSG:4326',
        // projection:'EPSG：3785',
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
 addPics(){     
   for(let i = 0;i<10;i++){
     let all = document.getElementById('all');
      let sElement = document.createElement("div");
       let img = document.createElement('div')
       let text = document.createElement('div')
       sElement.id = "overlay" + i;
       sElement.classList.add("picout")
       text.classList.add("temtext")
       text.innerHTML = this.cityweatherData[i][0] + '℃'
       all.appendChild(sElement)
      switch(this.cityweatherData[i][2]){
        case"yun":
           img.classList.add("yun");break;
        case"qing":
           img.classList.add("qing");break;
        case"yin":
           img.classList.add("yin");break;           
        case"yu":
           img.classList.add("yu");break;
        case"shachen":
           img.classList.add("shachen");break;          
        case"xue":
           img.classList.add("xue");break;
        case"lei":
           img.classList.add("lei");break;         
        case"wu":
           img.classList.add("wu");break;
        case"bingbao":
           img.classList.add("bingbao");break;
      }
      let box = document.getElementById(sElement.id)
       box.appendChild(img)
       box.appendChild(text)
        let oly = new Overlay({
        element: box,
        // autoPan: true,
        // positioning: 'center-center'
     })
     console.log(this.cityweatherData[i][4])
     let lon =  Number((this.cityweatherData[i][4].split(','))[0])
     let lat =  Number((this.cityweatherData[i][4].split(','))[1])
     console.log(lon,lat)
     this.map.addOverlay(oly)
     oly.setPosition([lon,lat])
   }
},
 changeZoom(){
        let _this = this
        let picouts = document.getElementsByClassName('picout')
        let temtexts = document.getElementsByClassName('temtext')
		    this.map.on("moveend",function(e){
			    let zoom = _this.map.getView().getZoom() //获取当前地图的缩放级别
			    if (zoom<9) {
            for(let i=0;i<picouts.length;i++){
            console.log(temtexts[i].style.fontSize)
            picouts[i].style.height = 100*Math.pow(2,(zoom-8)) + 'px'
            picouts[i].style.width = 100*Math.pow(2,(zoom-8))  + 'px'
            temtexts[i].style.fontSize = 18*Math.pow(2,(zoom-8))  + 'px'
            }}})}
},

mounted:function () {
    this.setMap();
    this.setOverlayer()
    this.mapHistory()
    this.getArray()
    // this.getWeather()
    // this.getAngle()
    // this.getWeather()
    this.getWeatherData()
    this.changeZoom()
    // this.addPics()
    // this.getLocation()
}
}


</script>
   <style>
        html,
        body {
            height: 100%;
            width: 100%;
        }
        .picout{
          height: 100px;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          /* background: url(../assets/cucumber/qing.png); */
        }
        /* img{
          float: left;
        } */
        
        .bingbao{
          background: url(../assets/cucumber/bingbao.png);
           flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
         .qing{
          background: url(../assets/cucumber/qing.png);
           flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
         .lei{
          background: url(../assets/cucumber/lei.png); 
           flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
        .yun{
          background: url(../assets/cucumber/yun.png);
          flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
         .shachen{
          background: url(../assets/cucumber/shachen.png);
           flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
          .wu{
          background: url(../assets/cucumber/wu.png);
           flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
          .xue{
          background: url(../assets/cucumber/xue.png);
           flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
          .yin{
          background: url(../assets/cucumber/yin.png);
           flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
          .yu{
          background: url(../assets/cucumber/yu.png);
           flex: 0 0 70%;
          height: 100%;
          background-size:100% 100%;
          background-repeat: no-repeat;
          border-radius: 10px;
          border: 1px solid #cccccc;
          box-shadow: 5px 5px 2.5px #888888;
        }
        .temtext{
          flex: 0 0 30%;
          color: blanchedalmond;
          font-family:"Times New Roman",Times,serif;
          border-radius: 6px;
          border: 1px solid #cccccc;
          /* font-size:18px; */
          background-color: #2db7f5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav{
           position:absolute;
           top:0px;
           left:0px;
           z-index: 100;
        }
        #weather{
          float: left;;
        }
        #eventTable{
          /* float: left; */
           position:absolute;
           top:0px;
           right:0px;
           z-index: 1000;
           width: 40%;
           /* height: 100px;
           overflow:scroll; */
        }
        #tableMode{
          float: left;
        }
        /* .map{
          height: 500px;
        } */
        .ol-popup{
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
