namespace calcApi {
	export const getElementHtml = (isChecked: boolean, id: number, title: string) => {
		const elemClass = !isChecked ? 'calc-elem__link' : 'calc-elem__link active';

		return `<li class="${elemClass}" data-id="${id}">${title}</li>`;
	}
}