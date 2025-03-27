

import { FaThumbsUp } from 'react-icons/fa'
import EvaluationStars from "./EvaluationStars";
import { IReview } from '@/dataInterfaces/IReview';

interface Props {
    review: IReview;
}

export default function EvaluationCard({ review }: Props) {
    return (
        <div className="grid grid-cols-[1fr_3fr_1fr] border-t-2 border-b-2 border-primary min-h-50 p-4 gap-4">
            <div className="flex flex-col gap-2 justify-center">
                {/* <p>{review.user.firstname + " " + review.user.lastname}</p> */}
                <p>{formatDate(review.createdAt)}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <EvaluationStars numStars={review.stars}/>
                <h1>{review.title}</h1>
                <p>{review.comment}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                <p>Esta avaliação foi útil?</p>
                <FaThumbsUp className=" text-2xl" />

            </div>

        </div>
    )
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
}
