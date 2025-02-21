// контейнер, содержащий карты
const mapDiv = document.getElementsByClassName("map")[0]

// объект c картой (<img>)
const mapImg = document.getElementsByClassName("map__main")[0]

// контейнер с отрисованной дорогой
const roads = document.getElementsByClassName("roads")[0]

// действительные размеры карты в пикселях
const MAP_WIDTH = 8000
const MAP_HEIGHT = 8000

// коэффициент растяжения карты
const kWidth = mapImg.clientWidth / MAP_WIDTH;
const kHeight = mapImg.clientHeight / MAP_HEIGHT;

// массив, содержащий элементы которые надо двигать
var elementsEvent = [mapImg];

// показательный код
let keyArr = Array.from(graph.nodes.keys());
let destNode = keyArr[Math.floor(Math.random() * keyArr.length)];
let srcNode;
do {
    srcNode = keyArr[Math.floor(Math.random() * keyArr.length)];
} while (destNode == srcNode);

var fromToRoad = [srcNode].concat(pathFrom(graph.dijkstra(destNode), srcNode));

// отрисовываем найденный маршрут и сохраняем
// созданные контейнеры в массив
roadsMapping(roads, coordsMapping, fromToRoad, elementsEvent);

mapDiv.addEventListener('mousedown', (event) => {
    // инициализируем начальные значения
    // для положения мыши во время нажатия
    startX = event.clientX;
    startY = event.clientY;
    
    // устанавливаем события для карты и созданных
    // в процессе генерации элементов маршрута
    for (let i = 0; i < elementsEvent.length; i++) {
        elementsEvent[i].addEventListener('mousemove', moveEvent);
    }
});

// при отжатии мышки удаляем созданные события 
// для перемещения карты и объектов на ней
document.getElementsByTagName('body')[0].addEventListener('mouseup', (event) => {
    for (let i = 0; i < elementsEvent.length; i++) {
        elementsEvent[i].removeEventListener('mousemove', moveEvent);
    }
});
