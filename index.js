const uploadInput = document.getElementById('uploadInput');
        const preview = document.getElementById('preview');
        const brightnessValue = document.getElementById('brightnessValue');
        const contrastValue = document.getElementById('contrastValue');
        const resolutionValue = document.getElementById('resolutionValue');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Function to handle file upload
        uploadInput.addEventListener('change', function() {
            const file = this.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    // Display image in canvas
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Calculate brightness and contrast
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const pixels = imageData.data;
                    let brightness = 0;
                    let contrast = 0;

                    for (let i = 0; i < pixels.length; i += 4) {
                        brightness += pixels[i] / (pixels.length / 4);
                    }

                    for (let i = 0; i < pixels.length; i += 4) {
                        contrast += Math.pow(pixels[i] - brightness, 2) / (pixels.length / 4);
                    }

                    brightnessValue.textContent = brightness.toFixed(2);
                    contrastValue.textContent = contrast.toFixed(2);
                    resolutionValue.textContent = `${canvas.width}x${canvas.height}`;

                    // Display image preview
                    preview.src = event.target.result;
                };

                img.src = event.target.result;
            };

            reader.readAsDataURL(file);
        });
