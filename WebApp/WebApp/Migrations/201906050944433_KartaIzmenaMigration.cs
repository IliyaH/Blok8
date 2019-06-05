namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KartaIzmenaMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Kartas", "VremeIzdavanja", c => c.DateTime(nullable: false));
            AddColumn("dbo.Kartas", "IdCenovnikStavka", c => c.Int(nullable: false));
            AddColumn("dbo.Kartas", "Validna", c => c.Boolean(nullable: false));
            CreateIndex("dbo.Kartas", "IdCenovnikStavka");
            AddForeignKey("dbo.Kartas", "IdCenovnikStavka", "dbo.CenovnikStavkas", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Kartas", "IdCenovnikStavka", "dbo.CenovnikStavkas");
            DropIndex("dbo.Kartas", new[] { "IdCenovnikStavka" });
            DropColumn("dbo.Kartas", "Validna");
            DropColumn("dbo.Kartas", "IdCenovnikStavka");
            DropColumn("dbo.Kartas", "VremeIzdavanja");
        }
    }
}
