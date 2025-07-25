# Image Setup Instructions

## Cloud Infrastructure Images

To add your cloud infrastructure images to the home page:

1. **Create the images directory:**
   ```bash
   mkdir -p public/images
   ```

2. **Add your images:**
   - Place `cloud_infra_1.png` in `public/images/`
   - Place `cloud_infra_2.png` in `public/images/`

3. **Update the HTML to use actual images:**
   
   Replace the placeholder divs in `src/app/components/home/home.component.html`:
   
   ```html
   <!-- Replace this placeholder: -->
   <div class="image-placeholder">
     <div class="placeholder-icon">...</div>
     <p>Cloud Infrastructure 1</p>
     <small>public/images/cloud_infra_1.png</small>
   </div>
   
   <!-- With this actual image: -->
   <img src="assets/images/cloud_infra_1.png" alt="Cloud Infrastructure 1" class="cloud-image">
   ```

4. **Move images to assets folder (recommended):**
   ```bash
   mkdir -p src/assets/images
   mv public/images/* src/assets/images/
   ```

5. **Add CSS for actual images:**
   
   Add this to `src/app/components/home/home.component.scss`:
   
   ```scss
   .cloud-image {
     width: 100%;
     height: auto;
     border-radius: 12px;
     object-fit: cover;
   }
   ```

## Current Setup

The home page now includes:
- ✅ Hero section with name and maxim
- ✅ Cloud Architecture section with title
- ✅ Feature grid with cloud services
- ✅ Placeholder containers for your images
- ✅ White card containers with rounded borders
- ✅ Responsive design for all screen sizes

The images will be displayed in white card containers with rounded borders as requested, perfect for images with white backgrounds. 