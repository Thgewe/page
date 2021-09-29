let birthdateVal = false,
    nameVal = false,
    genderVal = false,
    contryVal = false,
    cityVal = false,
    fileVal = false;

//Submit

(function () {
    const btnSubmit = document.querySelector('.info__submit-button');
    const form = document.querySelector('.info__form');
    const success = document.querySelector('.info__success-wrap');

    form.addEventListener('change', () => {
        success.classList.add("js-success-disabled");
        if (birthdateVal &&
            nameVal &&
            genderVal && 
            contryVal && 
            cityVal &&
            fileVal) 
        {
            btnSubmit.classList.remove('js-disabled');
            btnSubmit.tabIndex = 0;
        } else {
            btnSubmit.classList.add('js-disabled');
            btnSubmit.tabIndex = -1;
        }
    });

    btnSubmit.addEventListener('click', () => {
        success.classList.remove("js-success-disabled");
        btnSubmit.classList.add('js-disabled');
        btnSubmit.tabIndex = -1;
        window.scrollTo()
        return false;
    });

    form.addEventListener('click', () => {
        return false;
    });

}());



// File add

(function () {
    const fileInput = document.querySelector('.info__input-file');
    const btnAdd = document.querySelector('.info__input-file-add');
    const btnSubmit = document.querySelector('.info__submit-button');

    let fileCount = 0;
    let filesStore = [];

    fileInput.addEventListener("change", function () {
        for (let i = 0; i <= this.files.length; i++) {
            if (this.files[i]) {
                let fr = new FileReader();
                file = this.files[i];
                if (i < 4 && fileCount < 4) {
                    fr.addEventListener("load", function () {
                        filesStore.push(file);
                        createBlock(file, fr, filesStore.length - 1);
                    }, false);                   
                    fr.readAsDataURL(this.files[i]);
                } else {
                    btnAdd.classList.add('js-button-add-disabled');
                    btnAdd.tabIndex = -1;
                }
                fileCount++;
            }
        }
        if (fileCount >= 4) {
            btnAdd.classList.add('js-button-add-disabled');
        } 
        if (fileCount > 0) {
            fileVal = true;
        } else {
            fileVal = false;
        }
    });
    function createBlock(file, fr, fileKey) {
        let wrap = document.createElement('div'),
            picWrap = document.createElement('div'),
            pic = document.createElement('img'),
            textWrap = document.createElement('div'),
            fileName = document.createElement('p'),
            fileType = document.createElement('p'),
            delWrap = document.createElement('div'),
            del = document.createElement('img'),
            addField = document.querySelector('.info__file-add-field');
        wrap.classList.add('js-file-wrap');
        picWrap.classList.add('js-file-pic-wrap');
        pic.classList.add('js-file-pic');
        textWrap.classList.add('js-file-text');
        fileName.classList.add('js-file-name');
        fileType.classList.add('js-file-type');
        delWrap.classList.add('js-file-del');
        del.classList.add('js-file-del-pic');
        wrap.appendChild(picWrap);
        wrap.appendChild(textWrap);
        wrap.appendChild(delWrap);
        picWrap.appendChild(pic);
        textWrap.appendChild(fileName);
        textWrap.appendChild(fileType);
        delWrap.appendChild(del);
        pic.src = fr.result;
        del.src = "./img/svg/trashcan.svg";
        wrap.id = `${filesStore[fileKey].name}`;
        del.addEventListener('click', () => {
            document.getElementById(`${filesStore[fileKey].name}`).remove();
            filesStore.splice(fileKey, 1, '');
            fileCount--;
            btnAdd.classList.remove('js-button-add-disabled');
            btnAdd.tabIndex = 0;
            if (fileCount <= 0) {
                btnSubmit.classList.add('js-disabled');
                btnSubmit.tabIndex = -1;
            }
        });

        fileName.textContent = `${nameRefactor(file.name)}`;
        fileType.textContent = `${typeRefactor(file.name, file.size)}`;
        addField.insertAdjacentElement("afterbegin", wrap);
    }
    function nameRefactor(name) {
        if (name.slice(0, name.lastIndexOf('.')).length > 10) {
            return name.slice(0, 10) + "...";
        }
        return name.slice(0, name.lastIndexOf('.'));
    }
    function typeRefactor(name, size) {
        return name.slice(name.lastIndexOf('.') + 1).toUpperCase() + " " + (size / 1024 /1024).toFixed(1) + " mb";
    }
}());

// input handler

(function () {
    const selec = document.querySelector('.info__input-select');
    const firstInputs = document.querySelectorAll('.js-input-first')
    const hiddenFirst = document.querySelectorAll('.js-info-hidden-first');
    const hiddenSecond = document.querySelector('.js-info-hidden-second');
    const secondInputs = document.querySelectorAll('.js-input-second');
    const nameInput = document.getElementsByName('name');
    const dateInput = document.getElementsByName('birthdate');

    function forSelec(selec) {
        if (selec.value == "choose") {
            selec.classList.remove('select__option');
        } else {
            selec.classList.add('select__option');
        }
    }
    function forNameInputsOnInput(item) {
        if (item.value.search(/\W/) != -1 || item.value.search(/[0-9]/) != -1) {
            let index = item.value.search(/\W/);
            item.value = item.value.replace(item.value[index],'');
            index = item.value.search(/[0-9]/);
            item.value = item.value.replace(item.value[index],'');
        }
    }
    function forNameInputsOnPaste(item) {
        setTimeout(function() {
            for (let i = 0; i < item.value.length; i++) {
                if (i == item.value.search(/\W/) || i == item.value.search(/[0-9]/)) {
                    item.value = item.value.replace(item.value[i],'');
                    i--;
                }
            }
        }, 0);
    }
    function forFirstInputsOnInput(num, array) {
        if (array[0].value != '' && array[1].value != "choose" && array[num].value.search(/[A-Za-z]/) != -1) {
            hiddenFirst.forEach((hiddenItem) => {
                hiddenItem.classList.remove('js-info-hidden-first');
            })
            nameVal = true;
            genderVal = true;
            hiddenSecond.classList.remove('js-info-hidden-first');
        } else {
            hiddenFirst.forEach((hiddenItem) => {
                hiddenItem.classList.add('js-info-hidden-first');
            })
            nameVal = false;
            genderVal = false;
            hiddenSecond.classList.add('js-info-hidden-first');
        }
    }
    function forSecondInputsOnInput(array) {
        if (array[0].value != '' && array[1].value != '' && birthdateVal == true) {
            hiddenSecond.classList.remove('js-info-hidden-second');
            contryVal = true;
            cityVal = true;
        } else {
            contryVal = false;
            cityVal = false;
            hiddenSecond.classList.add('js-info-hidden-second');
        }
    }
    function forBirthdateInputOnInput(item) {
        if (item.value.search(/[A-Za-z]/ != -1)) {
            let index;
            index = item.value.search(/[A-Za-z]/);
            item.value = item.value.replace(item.value[index], '');
        }
        if (item.value.length >= 10) {
            if (+(item.value[0] + item.value[1]) > 31 || +(item.value[0] + item.value[1]) <= 0) {

            }
        }
        if (item.value.length >= 3 && item.value[3] != '.') {

        }
        for (let i = 0; i < item.value.length; i++) {
            if (item.value[i]) {

            }
        }
    }
    function inputBlur(item) {
        if (
            item.value.length != 10 ||
            item.value[2] != '.' ||
            item.value[5] != '.' ||
            +(item.value[0] + item.value[1]) > 31 ||
            +(item.value[0] + item.value[1]) < 1 ||
            +(item.value[3] + item.value[4]) > 12 ||
            +(item.value[3] + item.value[4]) < 1 ||
            +(item.value[6] + item.value[7] + item.value[8] + item.value[9]) < 1900 ||
            +(item.value[6] + item.value[7] + item.value[8] + item.value[9]) > 2021
            ) 
            {
            item.classList.add('js-invalid');
            birthdateVal = false;
        } else {
            birthdateVal = true;
        }
    }

    function inputFocus(item) {
        item.classList.remove('js-invalid');
    }
    
    firstInputs.forEach((item, num, array) => {
        item.oninput = function() {
            forFirstInputsOnInput(num, array);
            if (nameInput[num] === item) {
                forNameInputsOnInput(item);
            } else if (selec === item) {
                forSelec(item);
            }
        };
        item.onpaste = function() {
            if (nameInput[num] === item) {
                forNameInputsOnPaste(item);
            }
        }
    })
    secondInputs.forEach((item, num, array) => {
        item.oninput = function() {
            
            forSecondInputsOnInput(array);
            if (item === dateInput[0]) {
                forBirthdateInputOnInput(item);
            } else {
                forNameInputsOnInput(item);
            }

        };

        if (item === array[2]) {
            item.onblur = function() {
                inputBlur(item);
                forSecondInputsOnInput(array)
            };
            item.onfocus = function() {
                inputFocus(item);
            }
        }

        item.onpaste = function() {
            if (nameInput[num] === item) {
                forNameInputsOnPaste(item);
            }
        };
    })
}());

// Slider

(function() {
    const btnLeft = document.querySelector('.slider__left');
    const btnRight = document.querySelector('.slider__right');
    const circles = document.querySelectorAll('.slider__circle');
    const track = document.querySelector('.slider__track');
    const content = document.querySelector('.slider__content');
    let contentWidth = content.clientWidth;
    let pos = 0;

    circles.forEach((item, num, array) => {
        item.addEventListener('click', () => {
            array.forEach((itemArray) => {
                itemArray.classList.remove('js-circle-enabled');
            });
            item.classList.add('js-circle-enabled');
            switch(num) {
                case 0:
                    pos = 0;
                    switchPosition(pos);
                    break;
                case 1:
                    pos = 1;
                    switchPosition(pos);
                    break;
                case 2:
                    pos = 2;
                    switchPosition(pos);
                    break;
            }
        });
    });

    function switchPosition(pos) {
        track.style.transform = `translateX(${contentWidth*-pos}px)`;
    }

    function circleOffOn(pos) {
        circles.forEach((item, num, array) => {
            if (num == pos) {
                item.classList.add('js-circle-enabled');
            } else {
                item.classList.remove('js-circle-enabled');
            }
        });
    }

    btnLeft.addEventListener('click', () => {
        pos--;
        if (pos <= -1) {
            pos = 2;
        } 
        circleOffOn(pos);
        track.style.transform = `translateX(${contentWidth*-pos}px)`;
    });
        
    btnRight.addEventListener('click', () => {      
        pos++;
        if (pos >= 3) {
            pos = 0;
        }
        circleOffOn(pos);
        track.style.transform = `translateX(-${contentWidth*pos}px)`;
    });
}());

// Scroll to anchors

(function () {
    const smoothScroll = function (targetEl, duration) {
        const headerElHeight = document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());