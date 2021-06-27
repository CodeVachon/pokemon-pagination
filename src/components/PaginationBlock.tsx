import { FC } from "react";
import { ClassNames } from "@44north/classnames";
import { Button } from "./Button";

const range = (start, stop, step = 1) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const PaginationBlock: FC<{
    onPageClick: (pageNo: number) => void;
    currentPageNo: number;
    totalPageNo: number;
    padding?: number;
    className?: string | ClassNames;
}> = ({
    onPageClick = () => {},
    currentPageNo = 1,
    totalPageNo = 10,
    padding = 3,
    className = ""
}) => {
    let startNo = currentPageNo - padding;
    let endNo = currentPageNo + padding;

    if (startNo < 1) {
        const offset = 1 - startNo;
        endNo = endNo + offset;
        startNo = 1;
    }
    if (endNo > totalPageNo) {
        const offset = endNo - totalPageNo;
        startNo = startNo - offset;
        endNo = totalPageNo;
        if (startNo < 1) {
            startNo = 1;
        }
    }
    const pageNumbers = range(startNo, endNo);

    return (
        <div className={new ClassNames(["flex", "gap-4"]).add(className).list()}>
            <div>
                <Button
                    className={new ClassNames(["rounded-r-none"]).list()}
                    onClick={() => {
                        onPageClick(1);
                    }}
                >
                    First
                </Button>
                <Button
                    className={new ClassNames(["rounded-l-none"]).list()}
                    disabled={currentPageNo <= 1}
                    onClick={() => {
                        onPageClick(currentPageNo - 1);
                    }}
                >
                    Prev
                </Button>
            </div>

            <div>
                {pageNumbers.map((pageNo, index) => (
                    <Button
                        key={`pageNo-${pageNo}`}
                        onClick={() => onPageClick(pageNo)}
                        className={new ClassNames({
                            "bg-blue-500": currentPageNo === pageNo,
                            "rounded-l-none": index > 0,
                            "rounded-r-none": index < pageNumbers.length - 1
                        }).list()}
                    >
                        {pageNo}
                    </Button>
                ))}
            </div>

            <div>
                <Button
                    className={new ClassNames(["rounded-r-none"]).list()}
                    disabled={currentPageNo >= totalPageNo}
                    onClick={() => {
                        onPageClick(currentPageNo + 1);
                    }}
                >
                    Next
                </Button>
                <Button
                    className={new ClassNames(["rounded-l-none"]).list()}
                    onClick={() => {
                        onPageClick(totalPageNo);
                    }}
                >
                    Last
                </Button>
            </div>
        </div>
    );
};

export { PaginationBlock };
