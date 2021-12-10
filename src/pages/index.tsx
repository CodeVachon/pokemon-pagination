import React, { useState, useEffect } from "react";
import { PokemonCard, ErrorBlock, PaginationBlock, SelectBox } from "./../components";
import { ClassNames } from "@44north/classnames";
import { useQuery, gql } from "@apollo/client";

import type { IPokemonRecord } from "./../types";

const POKEMON_QUERY = gql`
    query GetPokemon($pageNo: Int, $itemsPerPage: Int) {
        countPokemon
        listPokemon(pageNo: $pageNo, itemsPerPage: $itemsPerPage) {
            id
            name
            height
            weight
            stats {
                name
                base_stat
            }
            species {
                habitat {
                    name
                }
                color {
                    name
                }
            }
            sprites {
                official_artwork_front_default
            }
            types {
                name
            }
            abilities {
                name
                is_hidden
            }
        }
    }
`;

function Homepage() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [pageNo, setPageNo] = useState<number>(1);

    const { data, loading, error, refetch } = useQuery<{
        countPokemon: number;
        listPokemon: IPokemonRecord[];
    }>(POKEMON_QUERY, {
        variables: {
            pageNo,
            itemsPerPage
        }
    });

    useEffect(() => {
        refetch({
            pageNo,
            itemsPerPage
        });
    }, [pageNo, itemsPerPage]);

    return (
        <div className={new ClassNames(["flex", "flex-col", "space-y-4"]).list()}>
            {error && <ErrorBlock error={error} />}

            {loading ? (
                <p>I am Loading...</p>
            ) : (data?.listPokemon || []).length === 0 ? (
                <ErrorBlock error={new Error("No Records Found")} />
            ) : (
                <>
                    <ul className="grid transition-all grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
                        {data.listPokemon.map((record) => (
                            <li key={record.id}>
                                <PokemonCard data={record} />
                            </li>
                        ))}
                    </ul>
                    <div
                        className={new ClassNames([
                            "flex",
                            "justify-between items-center",
                            "space-x-8"
                        ]).list()}
                    >
                        <PaginationBlock
                            onPageClick={(pageNo) => {
                                setPageNo(pageNo);
                            }}
                            currentPageNo={pageNo}
                            totalPageNo={Math.ceil(data.countPokemon / itemsPerPage)}
                        />
                        <div>
                            <SelectBox
                                value={itemsPerPage}
                                onChange={(value) => setItemsPerPage(Number(value))}
                                options={[1, 3, 6, 9, 12, 24, 48]}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Homepage;
