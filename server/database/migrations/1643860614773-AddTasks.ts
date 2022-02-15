
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class tasks1643860614773 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'projectId',
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

    queryRunner.createForeignKey(
      'task',
      new TableForeignKey(
        {
          columnNames: ['projectId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'project',
          onDelete: 'CASCADE',
        }
      )
    )

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }

}
