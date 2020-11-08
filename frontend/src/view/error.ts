namespace calcApi {
	export const getErrorHtml = (msg: string): string => `
		<style>
		    .calc-error {
		        color: red;
		    }
		</style>
		<p class="calc-error">${msg}</p>
	`
}