// ==UserScript==
// @name         view_minecount_and_time
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  view minecount and time
// @author       nagao
// @match        https://minesweeper.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minesweeper.online
// @grant        none
// ==/UserScript==

{
    'use strict';

    const element = document.createElement('div');

    element.style.position = 'fixed';
    element.style.cursor = 'move';
    element.style.top = '0';
    element.style.right = '0';
    element.style.width = '8em';
    element.style.height = '3em';
    element.style.fontSize = 'large';
    element.style.color = 'black';
    element.style.backgroundColor = 'white';
    element.style.zIndex = '2147483647';

    document.body.appendChild(element);

    // マウスの位置
    let x;
    let y;

    const mouseDownHandler = function (e) {
        x = e.clientX;
        y = e.clientY;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        e.preventDefault();

        // マウスの動き
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        // 要素の位置を設定
        element.style.left = `${element.offsetLeft + dx}px`;
        element.style.top = `${element.offsetTop + dy}px`;

        x = e.clientX;
        y = e.clientY;
    };

    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    element.addEventListener('mousedown', mouseDownHandler);

    setInterval(() => {
        element.innerHTML = `${W9.m20} mines<br>${W9.t16} sec`;
    },10);
}
