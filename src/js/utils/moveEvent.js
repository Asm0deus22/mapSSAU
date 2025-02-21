// начальные положения мыши при 
// срабатывании события нажатия мыши
var startX = 0;
var startY = 0;

const moveEvent = (event) => {
    // изменяем абсолютное положение карты и остальных элементов
    // на изменение по сравнению с предыдущим срабатыванием события
    for (let i = 0; i < elementsEvent.length; i++) {
        let mapPositionLeft = (elementsEvent[i].style.left.replace("px", "") * 1 ) + (event.clientX - startX);
        let mapPositionTop = (elementsEvent[i].style.top.replace("px", "") * 1 ) + event.clientY - startY;
        
        elementsEvent[i].style.top = mapPositionTop +  'px';
        elementsEvent[i].style.left = mapPositionLeft + 'px';
    }

    // перезаписываем начальные значения для клика
    startX = event.clientX;
    startY = event.clientY;
}