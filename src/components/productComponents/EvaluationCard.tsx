

import { FaThumbsUp } from 'react-icons/fa'
import EvaluationStars from "./EvaluationStars";
// interface EvaluationProps {
//     title?: string;
//     children?: React.ReactNode;
// }

export default function EvaluationCard() {
    return (
        <div className="grid grid-cols-[1fr_3fr_1fr] border-t-2 border-b-2 border-primary min-h-50 p-4 gap-4">
            <div className="flex flex-col gap-2 justify-center">
                <p>Marcos Vinicius</p>
                <p>09/09/2022</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <EvaluationStars />
                <h1>Resumo</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio eaque, facere perferendis veniam dicta tempora accusantium veritatis id, esse natus quod minus dolorem fuga nemo nam voluptatum quas ab velit!</p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                <p>Esta avaliação foi útil?</p>
                <FaThumbsUp className=" text-2xl" />

            </div>

        </div>
    )
}

