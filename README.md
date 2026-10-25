# Hasindu Himal Pemathilaka — Personal Portfolio

This folder can be uploaded directly to the root of a GitHub repository and published with GitHub Pages.

## Publish with GitHub Pages
1. Create a public GitHub repository named `YOUR-USERNAME.github.io` (replace YOUR-USERNAME with your actual GitHub username).
2. Unzip this package. In your repository, choose **Add file → Upload files** and drag all the **contents** of this folder into the upload area (`index.html`, `styles.css`, `script.js`, and `assets/`). Do not upload the ZIP itself and do not nest `index.html` under another folder.
3. Choose **Commit changes**.
4. Go to **Settings → Pages**. Choose **Deploy from a branch**, select **main** and **/(root)**, then **Save**.
5. Visit `https://YOUR-USERNAME.github.io/` once GitHub Pages reports a successful deployment.

The website includes real uploaded personal photos; its 'Future / The Next Chapter' image is AI-assisted.

## Fastest alternative
Use the standalone `index.html` file supplied separately. It includes HTML, CSS, JavaScript and image assets in a single file, so only that file needs to be uploaded.

Privacy: Your website will be publicly accessible, and GitHub Pages is not intended for private websites. Review all content before publishing.

## Two homes, two grids

An animated, interactive 50 Hz Sri Lanka / 60 Hz Alberta comparison now appears between the hero and story sections. Viewers can independently toggle the two traces and pause the motion. The display is an illustrative frequency comparison; voltages are nominal and amplitudes are not to scale. The animation respects reduced-motion settings. Edit `waveform.js`, `styles.css`, or the `<section id="signal">` element in `index.html` to customize it.
