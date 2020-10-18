import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://192.168.25.12:9696/uploads/${image.path}`,
        };
    },

    renderMany(images: Image[]) {
        return images.map(Image => this.render(Image));
    }
};