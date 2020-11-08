/// <reference path="../interfaces/IApiCalc.ts"/>
/// <reference path="../interfaces/IRequestData.ts"/>
/// <reference path="../interfaces/IModelsParams.ts"/>
/// <reference path="../interfaces/IContainerData.ts"/>
/// <reference path="../interfaces/IContainerElement.ts"/>
/// <reference path="../interfaces/IElement.ts"/>
/// <reference path="../interfaces/IElementData.ts"/>
/// <reference path="../interfaces/IResponseData.ts"/>
/// <reference path="../interfaces/IRenderData.ts"/>
/// <reference path="../types/state.ts"/>
/// <reference path="../view/carcase.ts"/>
/// <reference path="../view/loader.ts"/>
/// <reference path="../view/error.ts"/>
/// <reference path="../view/container.ts"/>
/// <reference path="../view/elementList.ts"/>
/// <reference path="../view/price.ts"/>

namespace calcApi {
    ((window) => {
        'use strict'

        const calcWidget = (<any>window).calcWidget = {} as IApiCalc

        /**
         * Инициализация калькулятора
         *
         * @return {Promise<void>}
         * @param modelsParams
         */
        calcWidget.init = async (modelsParams: IModelsParams): Promise<void> => {

            let containersData: IContainerData[] | null
            let calcContainer: HTMLElement | null
            const uri: string = 'https://slim.xppx.ru/work/src/'
            const calcElements = document?.getElementsByClassName('calc-elem')
            const closeIcons = document?.getElementsByClassName('calc-elem__close')
            const listElements = document?.getElementsByClassName('calc-elem__list')

            // @ HELPERS:

            /**
             * Возвращает отсортированный по ключу sort массив
             *
             * @param {array} containersData
             * @returns {array}
             */
            const sortContainers = (containersData: IContainerData[]): IContainerData[] => {
                if (containersData.length > 1) {
                    containersData.sort((a, b) => {
                        return a.sort - b.sort
                    })
                }

                return containersData
            }

            /**
             * Возвращает название для контейнера
             *
             * @param {array} elements
             * @param {string} header
             * @param {int|null} checkedID
             * @returns {string}
             */
            const getTitle = (elements: IElementData[], header: string, checkedID: number | null): string => {
                if (!checkedID) {
                    return header
                }

                const checkedElement = elements.filter(item => item.id === checkedID)[0]

                return checkedElement.title
            }

            /**
             * Обновляет data-id у контейнера
             *
             * @param {HTMLElement} container
             * @param {HTMLElement} target
             * @returns {void}
             */
            const updateContainerID = (container: IContainerElement, target: IElement): void => {
                const {id} = target.dataset

                container.dataset.checkedId = id
            }

            /**
             * Переключает класс у элемента
             *
             * @param {HTMLElement|null} element
             * @param {string} className
             * @returns {void}
             */
            const toggleElementClass = (element: HTMLElement | null, className: string): void => {
                if (!element) {
                    return
                }

                element.classList.toggle(className)
            }

            /**
             * Переключает класс у элементов
             *
             * @param {HTMLElement|HTMLCollection} elements
             * @param {string} className
             * @returns {void}
             */
            const toggleElementsClass = (elements: HTMLElement[] | HTMLCollection, className: string): void => {
                const elementsList = elements instanceof Array ? elements : [...elements] as HTMLElement[]

                elementsList.forEach(element => {
                    toggleElementClass(element, className)
                })
            }

            /**
             * Обновляет заголовок у блока
             *
             * @param {HTMLElement|null} titleElement
             * @param {HTMLElement} target
             * @returns {void}
             */
            const updateContainerTitle = (titleElement: HTMLElement | null, target: HTMLElement): void => {
                if (!titleElement) {
                    return
                }

                titleElement.innerHTML = target.innerText

                toggleElementClass(titleElement, 'fade')

                setTimeout(() => {
                    toggleElementClass(titleElement, 'fade')
                }, 800)
            }

            // @ RESPONSE DATA:

            /**
             *
             * @param {array|null} containersData
             * @param {boolean} isNeedAddOldData
             */
            const getInitialResponseData = (containersData: IContainerData[] | null, isNeedAddOldData: boolean): IRequestData => {
                const modelsParams = {}

                if (!isNeedAddOldData || !containersData) {
                    return {modelsParams}
                }

                const data = containersData.filter(containerData => containerData.checkedID)
                const bindingMap = data.reduce((acc, containerData) => {
                    const {elemBinding} = containerData
                    return {...acc, ...elemBinding}
                }, {})
                const excludedModels = data.map(containerData => containerData.table)

                return {modelsParams, data, bindingMap, excludedModels}
            }

            /**
             * Отправляет запрос на сервер
             *
             * @param {string} uri
             * @param {boolean} isPost
             * @param {object} data
             * @returns {Promise<*>}
             */
            const getResponse = async (uri: string, isPost: boolean = false, data: IRequestData): Promise<IResponseData> => {
                const settings = {
                    method: isPost ? 'POST' : 'GET',
                    headers: {
                        'Content-Type': 'application/jsoncharset=utf-8',
                    },
                    body: JSON.stringify(data),
                }

                try {
                    const fetchResponse = await fetch(uri, settings)

                    return await fetchResponse.json()
                } catch (e) {
                    throw e
                }
            }

            /**
             * Возвращает данные для отправки на сервер
             *
             * @param {object} container
             * @returns {object}
             */
            const getDataForRequest = (container: IContainerElement): IRequestData => {
                const calcElementsData = [...calcElements]
                const slicedIndex = calcElementsData.indexOf(container) + 1
                const containers = calcElementsData.slice(0, slicedIndex) as IContainerElement[]
                const isNeedAddOldData = calcElementsData.length === slicedIndex
                const initialResponse = getInitialResponseData(containersData, isNeedAddOldData)

                return containers.reduce((acc, container) => {
                    const {table, checkedId} = container.dataset

                    // @ts-ignore
                    acc.modelsParams[table] = checkedId

                    return acc
                }, initialResponse)
            }

            /**
             * Посылает данные для обновления контейнеров с элементами
             *
             * @param {object} requestData
             * @returns {Promise<void>}
             */
            const updateContainers = async (requestData: IRequestData): Promise<void> => {
                try {
                    const {isSuccess, data, msg: error} = await getResponse(uri, true, requestData)

                    if (!isSuccess) {
                        render('error', {error})
                        return
                    }

                    containersData = sortContainers(data)
                    render('show-calc-containers', {containersData})
                } catch (e) {
                    render('error')
                }
            }

            // @ HTML:
            
            /**
             * Вставляет в DOM первоначальный HTML и CSS
             *
             * @returns {void}
             */
            const generateCalcCarcase = (): void => {
                const calcSection = document.createElement('div')
                const html = getCarcaseHtml()
                
                calcSection.classList.add('calc-section')
                calcSection.insertAdjacentHTML('afterbegin', html)

                document.body.appendChild(calcSection)

                calcContainer = document.getElementById('calcContainer')
            }

            /**
             * Возвращает HTML для списка элементов контейнера
             *
             * @param {array} elementsData
             * @param {int|null} checkedID
             * @returns {string}
             */
            const getElementsListHTML = (elementsData: IElementData[], checkedID: number | null): string => {
                const preparedID = !checkedID ? null : +checkedID

                const elementListHTML = elementsData.map(({id, title}) => {
                    const isChecked = id === preparedID

                    return getElementHtml(isChecked, id, title)
                })

                return elementListHTML.join('\n')
            }

            /**
             * Возвращает HTML для контейнера с ценой
             * @param {object} containerData
             * @returns {string}
             */
            const getPriceContainer = (containerData: IContainerData): string => {
                const {elements} = containerData
                const isShowPrice = elements.length === 1

                if (!isShowPrice) {
                    return ''
                }

                const {title} = elements[0]

                return getPriceHtml(title)
            }

            /**
             * Возвращает HTML для контейнера с элементами
             * @param {object} containerData
             * @returns {string}
             */
            const getContainerHTML = (containerData: IContainerData): string => {
                const {table, title, checkedID, elements} = containerData
                const elementsHTML = getElementsListHTML(elements, checkedID)

                return getContainerHtml(elementsHTML, table, checkedID, title)
            }

            /**
             * Возвращает HTML для всех контейнеров
             * @param {array} containersData
             * @returns {string}
             */
            const getContainersHTML = (containersData: IContainerData[]): string => {
                const containersHtmlData: string[] = []

                Object.values(containersData).forEach((containerData: IContainerData) => {
                    const {header, type, elements, checkedID} = containerData

                    containerData.checkedID = !checkedID ? null : +checkedID
                    containerData.title = getTitle(elements, header, containerData.checkedID)

                    const typeMapFn = {
                        'section': getContainerHTML,
                        'price': getPriceContainer
                    }

                    const containerHTML = typeMapFn[type](containerData)
                    containersHtmlData.push(containerHTML)
                })

                return containersHtmlData.join('\n')
            }

            // @ HANDLERS:

            /**
             * Обработчик клика по закрытию выпадающего списка
             *
             * @param {Event} e
             * @returns {void}
             */
            const closeIconClickHandler = (e: Event): void => {
                const currentTarget = e.currentTarget as HTMLElement | null

                if (!currentTarget) {
                    return
                }

                const container = currentTarget.closest('.calc-elem') as HTMLElement | null

                if (!container) {
                    toggleElementClass(currentTarget, 'active')
                    return
                }

                toggleElementsClass([container, currentTarget], 'active')
            }

            /**
             *  Обработчик наведения на иконку закрытия выпадающего списка
             *
             * @param {Event} e
             * @returns {void}
             */
            const closeIconHoverHandler = (e: Event): void => {
                const currentTarget = e.currentTarget as HTMLElement | null

                if (!currentTarget) {
                    return
                }

                const container = currentTarget.closest('.calc-elem') as HTMLElement | null
                toggleElementClass(container, 'hover')
            }

            /**
             * Обработчик клика по элементам списка
             *
             * @param {Event} e
             * @returns {Promise<void>}
             */
            const listElementsClickHandler = async (e: Event): Promise<void> => {
                const target = e.target as IElement | null
                const currentTarget = e.currentTarget as HTMLElement | null
                const isListElement = target !== currentTarget

                if (!target || !isListElement) {
                    return
                }

                const container = target.closest('.calc-elem') as IContainerElement | null

                if (!container) {
                    return
                }

                const activeElement = container.querySelector('.calc-elem__link.active') as HTMLElement | null
                const titleElement = container.querySelector('.calc-elem__title') as HTMLElement | null

                if (activeElement) {
                    toggleElementClass(activeElement, 'active')
                }

                if (titleElement) {
                    updateContainerTitle(titleElement, target)
                }

                updateContainerID(container, target)

                toggleElementsClass([target, container], 'active')

                const dataForRequest = getDataForRequest(container)
                await updateContainers(dataForRequest)
            }

            /**
             * Добавляет обработчики для элементов контейнеров
             *
             * @returns {void}
             */
            const bindElementsHandlers = (): void => {
                if (closeIcons.length) {
                    [...closeIcons].forEach(closeIcon => {
                        closeIcon.addEventListener('click', closeIconClickHandler)
                        closeIcon.addEventListener('mouseenter', closeIconHoverHandler)
                        closeIcon.addEventListener('mouseover', closeIconHoverHandler)
                    })
                }

                if (listElements.length) {
                    [...listElements].forEach(listElements => {
                        listElements.addEventListener('click', listElementsClickHandler)
                    })
                }
            }

            /**
             * Рендеринг виджета
             *
             * @param {string} state
             * @param {object} renderData
             * @returns {void}
             */
            const render = (state: state, renderData: IRenderData = {}): void => {
                const cb = () => {
                    if (!calcContainer) {
                        return
                    }

                    const {error, containersData} = renderData

                    if (state === 'loader') {
                        calcContainer.innerHTML = getLoaderHtml()
                    }

                    if (state === 'error') {
                        calcContainer.innerHTML = getErrorHtml(error || 'Что-то пошло не так...')
                    }

                    if (state === 'show-calc-containers' && containersData) {
                        calcContainer.innerHTML = getContainersHTML(containersData)
                        bindElementsHandlers()
                    }
                }

                setTimeout(cb, 0)
            }

            generateCalcCarcase()
            render('loader')

            await updateContainers({modelsParams})
        }
    })(window)
}