import { Router } from 'express';
import { ISaint, Saint } from '../models/saint';

const router = Router();

router.get('/', (_req, res, next) => {
  Saint.find()
    .then((saints) => res.send(saints))
    .catch((err) => next(err));
});

router.post('/', function (req: { body: ISaint }, res, next) {
  const { name, birthYear, deathYear } = req.body;
  const saint = new Saint({ name, birthYear, deathYear });
  saint
    .save()
    .then((savedSaint) => res.send(savedSaint))
    .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
  Saint.findById(req.params.id)
    .then((saint) => res.send(saint))
    .catch((err) => next(err));
});

router.put(
  '/:id',
  (req: { body: ISaint; params: { id: string } }, res, next) => {
    const {
      body: { name, birthYear, deathYear },
      params: { id },
    } = req;

    const updatedSaint = new Saint({
      name,
      birthYear,
      deathYear,
      _id: id,
    });

    Saint.findByIdAndUpdate(id, updatedSaint)
      .then(() => res.send(updatedSaint))
      .catch((err) => next(err));
  }
);

router.delete('/:id', (req, res, next) => {
  Saint.findByIdAndRemove(req.params.id)
    .then((saint) => res.send(saint))
    .catch((err) => next(err));
});

export default router;
