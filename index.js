import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { easeIn, easeOut } from 'ol/easing.js';
import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';

// fromLonLat将坐标从经度/纬度转换为不同的投影。投影到目标投影的坐标。默认投影是球形墨卡托（EPSG：3857）。
var london = fromLonLat([-0.12755, 51.507222]);
var moscow = fromLonLat([37.6178, 55.7517]);
var istanbul = fromLonLat([28.9744, 41.0128]);
var rome = fromLonLat([12.5, 41.9]);
var bern = fromLonLat([7.4458, 46.95]);

var view = new View({
    center: istanbul,
    zoom: 6
});

var map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            // preload预载。将低分辨率图块加载到最高preload级别。0 意味着没有预加载
            preload: 4,
            source: new OSM()
        })
    ],
    // 通过在动画制作时加载切片来改善用户体验。 会在移动设备或慢速设备上制作动画。
    loadTilesWhileAnimating: true,
    view: view
});

// A bounce easing method (from https://github.com/DmitryBaranovskiy/raphael).
function bounce(t) {
    var s = 7.5625;
    var p = 2.75;
    var l;
    if (t < (1 / p)) {
        l = s * t * t;
    } else {
        if (t < (2 / p)) {
            t -= (1.5 / p);
            l = s * t * t + 0.75;
        } else {
            if (t < (2.5 / p)) {
                t -= (2.25 / p);
                l = s * t * t + 0.9375;
            } else {
                t -= (2.625 / p);
                l = s * t * t + 0.984375;
            }
        }
    }
    return l;
}

// An elastic easing method (from https://github.com/DmitryBaranovskiy/raphael).
function elastic(t) {
    return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
}

function onClick(id, callback) {
    document.getElementById(id).addEventListener('click', callback);
}

onClick('rotate-left', function() {
    view.animate({
        rotation: view.getRotation() + Math.PI / 2
    });
});

onClick('rotate-right', function() {
    view.animate({
        rotation: view.getRotation() - Math.PI / 2
    });
});

onClick('rotate-around-rome', function() {
    //Rotat旋转动画采用最短的弧线，因此动画分为两部分
    var rotation = view.getRotation();
    // easeOut 开始慢和加快。
    view.animate({
        rotation: rotation + Math.PI,
        anchor: rome,
        easing: easeIn
    }, {
        rotation: rotation + 2 * Math.PI,
        anchor: rome,
        easing: easeOut
    });
});

onClick('pan-to-london', function() {
    view.animate({
        center: london,
        duration: 2000
    });
});

onClick('elastic-to-moscow', function() {
    // duration动画的持续时间（以毫秒为单位）。默认情况下，目标范围没有动画
    view.animate({
        center: moscow,
        duration: 2000,
        easing: elastic
    });
});

onClick('bounce-to-istanbul', function() {
    view.animate({
        center: istanbul,
        duration: 2000,
        easing: bounce
    });
});

onClick('spin-to-rome', function() {
    // Rotation animation takes the shortest arc, so animate in two parts
    var center = view.getCenter();
    view.animate({
        center: [
            center[0] + (rome[0] - center[0]) / 2,
            center[1] + (rome[1] - center[1]) / 2
        ],
        rotation: Math.PI,
        easing: easeIn
    }, {
        center: rome,
        rotation: 2 * Math.PI,
        easing: easeOut
    });
});

function flyTo(location, done) {
    var duration = 2000;
    var zoom = view.getZoom();
    var parts = 2;
    var called = false;

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }
    view.animate({
        center: location,
        duration: duration
    }, callback);
    view.animate({
        zoom: zoom - 1,
        duration: duration / 2
    }, {
        zoom: zoom,
        duration: duration / 2
    }, callback);
}

onClick('fly-to-bern', function() {
    flyTo(bern, function() {});
});

function tour() {
    var locations = [london, bern, rome, moscow, istanbul];
    var index = -1;

    function next(more) {
        if (more) {
            ++index;
            if (index < locations.length) {
                var delay = index === 0 ? 0 : 750;
                setTimeout(function() {
                    flyTo(locations[index], next);
                }, delay);
            } else {
                alert('Tour complete');
            }
        } else {
            alert('Tour cancelled');
        }
    }
    next(true);
}

onClick('tour', tour);