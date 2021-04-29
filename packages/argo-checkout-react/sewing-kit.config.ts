import {createPackage} from '@sewing-kit/config';
import {argoPackage} from '../../config/sewing-kit';

export default createPackage((pkg) => {
  pkg.entry({root: './src/index'});
  pkg.use(argoPackage({react: true}));
});
