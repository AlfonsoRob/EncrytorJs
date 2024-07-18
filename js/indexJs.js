const copyText = async () => {
    try {
        let text = document.getElementById("messageCrypted").value;
        await navigator.clipboard.writeText(text);
        clearText();
      } catch (err) {
        console.error('Error copying: ', err);
        alert('Error copying');
      }
}

const encryptText = () => {
    transformText(true);
}

const decryptText = () => {
    transformText(false);
}

const transformText = (isEncrypt) => {
    let text = document.getElementById("toCrypt").value.trim();
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zñ\s]/gi, "");

    if (/^[a-zñ\s]*$/.test(text) && text.length > 0) {
        const codifications = isEncrypt ? [['e', 'enter'], ['i', 'imes'], ['a', 'ai'], ['o', 'ober'], ['u', 'ufar']] : [['enter', 'e'], ['imes', 'i'], ['ai', 'a'], ['ober', 'o'], ['ufar', 'u']];
        let transformedText = text;

        for (const [start, end] of codifications) {
            transformedText = transformedText.replace(new RegExp(start, 'gi'), end);
        }

        document.getElementById("messageCrypted").value = transformedText;
    } else {
        alert('Only letters from a to z and spaces');
        clearText();
    }
}

function clearText() {
    document.getElementById("toCrypt").value = '';
    document.getElementById("messageCrypted").value = '';
}