import {MigrationInterface, QueryRunner, Table} from 'typeorm';

/*
ID: int
ProjectId: int
Title: string
Description: string
TimeEst: string
Status: bool
UserId: int

*/

export class tasks1643860614773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'tasks',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                    name: 'ProjectId',
                    type: 'int',
                    isNullable: false,
                },
                {
                  name: 'title',
                  type: 'text',
                  isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'timeEst',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'bool',
                    isNullable: false,
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,
                },
              ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks');
    }
    

}
