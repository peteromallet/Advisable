import React from 'react';
import pluralize from 'src/utilities/pluralize';
import StarRating from 'src/components/StarRating';
import { ReviewsCount } from './styles';

export default ({ rating, count }) => {
  return (
    <div>
      <StarRating size="l" rating={rating} />
      <br />
      <ReviewsCount>
        {pluralize(count, 'Review', 'Reviews')}
      </ReviewsCount>
    </div>
  )
}