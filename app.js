// @ts-nocheck

const input = document.getElementById('file-input');

input.addEventListener('change', async (e) => {
    const file = input.files[0];

    if (file) {
        input.disabled = true;
        // console.log(file);

        const arrayBuffer = await file.arrayBuffer();
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
            // Float32Array 
            const currentChannel = audioBuffer.getChannelData(channel);

            for (let i = 0; i < 10/* audioBuffer.length */; i++) {
                const float32 = currentChannel[i];
                const f = new Float(float32);

                // console.log(new Float(float32));
                // console.log(float32, float32.toString(32));
            }
        }

        // console.log(audioBuffer);
        input.disabled = false;
    }
});
