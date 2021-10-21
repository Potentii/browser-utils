export default class FileUtils{

	/**
	 * 
	 * @param {File|Blob} file
	 * @param {'base64'|'text'|'binary'|'arrayBuffer'} format
	 * @return {Promise<String|ArrayBuffer>}
	 */
	static read(file, format){
		return new Promise((resolve, reject) => {
			// *Creating a new file reader:
			const reader = new FileReader();

			// *When the file encoding gets completed:
			reader.addEventListener('load', () => { // TODO maybe arraybuffer is different
				// *Calling the callback if any, and passing the encoded string:
				resolve(reader.result);
			}, false);
			
			// *Checking if the file is set:
			if(file){
				// *If it is:
				// *Starting to encode the file:
				switch(format){
				case 'base64':
					reader.readAsDataURL(file);
					break;
				case 'text':
					reader.readAsText(file);
					break;
				case 'binary':
					reader.readAsBinaryString(file)
					break;
				case 'arrayBuffer':
					reader.readAsArrayBuffer(file)
					break;
				default:
					throw new Error(`Invalid format "${format}"`);
				}
			}
		});
	}


	/**
	 * 
	 * @param {File|Blob} file
	 * @return {Promise<String>}
	 */
	static readAsBase64(file){
		return FileUtils.read(file, 'base64');
	}


	/**
	 * 
	 * @param {File|Blob} file
	 * @return {Promise<String>}
	 */
	static readAsText(file){
		return FileUtils.read(file, 'text');
	}
	
	
	/**
	 *
	 * @param {File|Blob} file
	 * @return {Promise<String>}
	 */
	static readAsBinary(file){
		return FileUtils.read(file, 'binary');
	}
	
	
	/**
	 *
	 * @param {File|Blob} file
	 * @return {Promise<ArrayBuffer>}
	 */
	static readAsArrayBuffer(file){
		return FileUtils.read(file, 'arrayBuffer');
	}

}