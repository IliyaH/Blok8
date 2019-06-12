namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StationLineModelMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StationLines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IdStation = c.Int(nullable: false),
                        IdLine = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.IdLine, cascadeDelete: true)
                .ForeignKey("dbo.Stations", t => t.IdStation, cascadeDelete: true)
                .Index(t => t.IdStation)
                .Index(t => t.IdLine);
            
            CreateTable(
                "dbo.TimetableActives",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Start = c.DateTime(),
                        End = c.DateTime(),
                        Active = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Stations", "Name", c => c.String());
            DropColumn("dbo.Stations", "Naem");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Stations", "Naem", c => c.String());
            DropForeignKey("dbo.StationLines", "IdStation", "dbo.Stations");
            DropForeignKey("dbo.StationLines", "IdLine", "dbo.Lines");
            DropIndex("dbo.StationLines", new[] { "IdLine" });
            DropIndex("dbo.StationLines", new[] { "IdStation" });
            DropColumn("dbo.Stations", "Name");
            DropTable("dbo.TimetableActives");
            DropTable("dbo.StationLines");
        }
    }
}
