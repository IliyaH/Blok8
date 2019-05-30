namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FirstMigration : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StanicaLinija1", "Stanica_Id", "dbo.Stanicas");
            DropForeignKey("dbo.StanicaLinija1", "Linija_Id", "dbo.Linijas");
            DropIndex("dbo.StanicaLinija1", new[] { "Stanica_Id" });
            DropIndex("dbo.StanicaLinija1", new[] { "Linija_Id" });
            DropTable("dbo.StanicaLinija1");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.StanicaLinija1",
                c => new
                    {
                        Stanica_Id = c.Int(nullable: false),
                        Linija_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Stanica_Id, t.Linija_Id });
            
            CreateIndex("dbo.StanicaLinija1", "Linija_Id");
            CreateIndex("dbo.StanicaLinija1", "Stanica_Id");
            AddForeignKey("dbo.StanicaLinija1", "Linija_Id", "dbo.Linijas", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StanicaLinija1", "Stanica_Id", "dbo.Stanicas", "Id", cascadeDelete: true);
        }
    }
}
