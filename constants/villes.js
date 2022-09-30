import { images } from "../constants";

const villes = [
  {
    id: '1',
    name: 'Yaoundé',
    location: 'Risidez vous ici?',
    price: 45000,
    image: images.ynde,
    category: 'Centre',
    details: `
    Si vouz residez dans la ville et sohaitez avoir vos ordure vidé, enrollez-vous`,
  },
  {
    id: '2',
    name: 'Douala',
    location: 'La capital economique',
    price: 45000,
    image: images.dla,
    category: 'Littoral',
    details: `
    Si vouz residez dans la ville et sohaitez avoir vos ordure vidé, enrollez-vous`,
  },
  {
    id: '3',
    name: 'Kribi',
    location: 'Profitez des belle plages',
    price: 45000,
    image: images.kribi,
    category: 'Littoral',
    details: `
    Si vouz residez dans la ville et sohaitez avoir vos ordure vidé, enrollez-vous`,
  },
  {
    id: '4',
    name: 'Cashiga',
    location: 'Le grand nord',
    price: 35000,
    image: images.nord,
    category: 'Nord',
    details: `
    Si vouz residez dans la ville et sohaitez avoir vos ordure vidé, enrollez-vous`,
  },
];

export default villes;
