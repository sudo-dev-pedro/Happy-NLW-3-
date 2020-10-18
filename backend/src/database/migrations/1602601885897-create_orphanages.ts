import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602601885897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2, 
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2, 
                },
                {
                    name: 'sobre',
                    type: 'text'
                },
                {
                    name: 'instrucoes',
                    type: 'text'
                },
                {
                    name: 'horario_abertura',
                    type: 'varchar',
                },     
                {
                    name: 'abertura_fins_de_semana',
                    type: 'boolean',
                    default: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages');
    }
}
