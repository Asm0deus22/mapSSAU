const roadsMapping = (container, coords, routes, saveTo) => {
    for (let i = 0; i < routes.length - 1; i++) {
        // получаем информацию, где должна
        // быть картинка дороги
        let roadCoords = coords[routes[i]][routes[i+1]];
        
        // определяем положение отображаемой
        // дороги с учётом растяжения карты
        let roadStartX = roadCoords.x * kWidth;
        let roadStartY = roadCoords.y * kHeight;
        let roadWidth = roadCoords.width * kWidth;
        let roadHeight = roadCoords.height * kHeight;

        // создаём контейнер, в котором будет хранится
        // картинка дороги
        let roadDiv = document.createElement('div');
        roadDiv.style.zIndex = 52;
        roadDiv.style.position = "absolute";
        roadDiv.style.width = roadWidth + "px";
        roadDiv.style.height = roadHeight + "px";
        roadDiv.style.left = roadStartX + "px";
        roadDiv.style.top = roadStartY + "px";
        roadDiv.ondragstart = () => {return false};
        roadDiv.ondrop = () => {return false};
        
        // задаём картинке параметры
        let roadImg = document.createElement('img'); 
        roadImg.src = 'images/4.png';
        roadImg.style.width = roadWidth + "px";
        roadImg.style.height = roadHeight + "px";
        
        // добавляем в DOM и сохраняем
        roadDiv.appendChild(roadImg);
        container.appendChild(roadDiv);
        saveTo.push(roadDiv);

    }
}
