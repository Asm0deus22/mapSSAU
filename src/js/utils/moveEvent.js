// начальные положения мыши при 
// срабатывании события нажатия мыши
var startX = 0;
var startY = 0;

const moveEvent = (event) => {
    // если нет event.clientX, то это нажатие с мобильного устройства
    let currentX = event.clientX;
    let currentY = event.clientY;
    if (!currentX) {
        currentX = event.touches[0].clientX;
        currentY = event.touches[0].clientY;
    }
    
    // изменяем абсолютное положение карты и остальных элементов
    // на изменение по сравнению с предыдущим срабатыванием события
    for (let i = 0; i < elementsEvent.length; i++) {
        let mapPositionLeft = (elementsEvent[i].style.left.replace("px", "") * 1 ) + (currentX - startX);
        let mapPositionTop = (elementsEvent[i].style.top.replace("px", "") * 1 ) + currentY - startY;
        
        elementsEvent[i].style.top = mapPositionTop +  'px';
        elementsEvent[i].style.left = mapPositionLeft + 'px';
    }

    // перезаписываем начальные значения для клика
    if (event.clientX) {
        startX = event.clientX;
        startY = event.clientY;
    } else {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }
}